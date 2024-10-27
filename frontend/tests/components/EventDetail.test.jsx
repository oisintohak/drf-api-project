import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import delay from "delay";

import React from "react";
import EventDetail from "../../src/pages/events/EventDetail";

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { db } from "../mocks/db";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { CurrentUserProvider } from "../../src/providers/CurrentUserContext";
import { server } from "../mocks/server";
import { getResponse, http, HttpResponse } from "msw";
import useEvent from "../../src/queries/useEvent";
import { handlers } from "../mocks/handlers";
import { addResultsKeyToResponse, simulateDelay, simulateError } from "../utils";
describe("EventDetail", () => {
  let eventId = 1;
  beforeEach(() => {});
  beforeAll(() => {
    const user1 = db.user.create();
    const user2 = db.user.create();
    // const event1 = db.event.create({ id: 1});
    const event1 = db.event.create({ id: 1, created_by: user1 });
    const event2 = db.event.create({ id: 2, created_by: user2 });
    const attendee1 = db["attendee"].create({ user: 1, event: "1" });

    eventId = event1.id;
  });

  afterAll(() => {
    db.event.delete({ where: { id: { equals: 1 } } });
  });
  const renderComponent = (eventData) => {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    let event;
    if (eventData) {
      event = db.event.update({
        where: { id: { equals: 1 } },
        data: { ...eventData },
      });
    } else {
      event = db.event.findFirst({ where: { id: { equals: 1 } } });
    }

    render(
      <QueryClientProvider client={client}>
        <RouterProvider
          router={createMemoryRouter(
            [
              {
                path: "/events/:id",
                element: (
                  <CurrentUserProvider>
                    <EventDetail />
                  </CurrentUserProvider>
                ),
              },
            ],
            { initialEntries: ["/events/1"] }
          )}
        ></RouterProvider>
      </QueryClientProvider>
    );
    return {
      event,
      user: userEvent.setup(),
      getButton: async (label) => screen.findByRole("button", { name: label }),
      waitForEventToLoad: async () => {
        const heading = await screen.findByRole("heading", {
          name: event.title,
        });
        return { heading };
      },
      waitForAttendeesToLoad: async () => {
        await screen.findByRole("heading", {
          name: /attendees/i,
        });
      },
      getEventSkeleton: () =>
        screen.queryByRole("progressbar", { name: /event/i }),
      getAttendeeSkeleton: () =>
        screen.queryByRole("progressbar", { name: /attendees/i }),
      getEventError: async() =>
        screen.findByRole("alert", { name: /event/i }),
      getAttendeesError: async() =>
        screen.findByRole("alert", { name: /attendees/i }),
    };
  };

  it("should render a loading skeleton while fetching event data", async () => {
    simulateDelay("/api/events/1/", "get", 1000);
    const { getEventSkeleton } = renderComponent();
    expect(getEventSkeleton()).toBeInTheDocument();
  });

  it(
    "should hide the loading skeleton after event data is fetched",
    { timeout: 10000 },
    async () => {
      const { getEventSkeleton, waitForEventToLoad } = renderComponent();
      await waitForElementToBeRemoved(getEventSkeleton);
      const { heading } = await waitForEventToLoad();
      expect(heading).toBeInTheDocument();
    }
  );
  it(
    "should render an error message if the event data fails to load",
    { timeout: 10000 },
    async () => {
      simulateError("/api/events/1/", "get")
      const { getEventError} = renderComponent();
      console.log(getEventError())
      expect(await getEventError()).toBeInTheDocument();
      
    }
  );
  it(
    "should render an error message if the attendee data fails to load",
    { timeout: 10000 },
    async () => {
      simulateError("/api/attendees/", "get")
      const { getAttendeesError} = renderComponent();
      console.log(await getAttendeesError())
      expect(await getAttendeesError()).toBeInTheDocument();
      
    }
  );
  it("should render a loading skeleton while fetching attendee data", async () => {
    simulateDelay("/api/events/1/", "get", 1000);
    const { getAttendeeSkeleton } = renderComponent();
    expect(getAttendeeSkeleton()).toBeInTheDocument();
  });

  it(
    "should hide the loading skeleton after attendee data is fetched",
    { timeout: 10000 },
    async () => {
      const { getAttendeeSkeleton } = renderComponent();
      await waitForElementToBeRemoved(getAttendeeSkeleton);
    }
  );

  it("should render the attendees list", { timeout: 10000 }, async () => {
    let attendee = db["attendee"].findFirst({
      where: { event: { equals: "1" } },
    });
    await addResultsKeyToResponse("/api/attendees/");
    const { waitForAttendeesToLoad } = renderComponent();
    await waitForAttendeesToLoad();
    expect(
      await screen.findByText(new RegExp(attendee.bio))
    ).toBeInTheDocument();
  });
  it(
    "should update favourite count when attend button is clicked",
    { timeout: 10000 },
    async () => {
      const { getButton, user, event, waitForEventToLoad } = renderComponent({
        favourite_id: null,
        is_creator: false,
      });
      await waitForEventToLoad();
      const favouriteButton = await getButton(/favourite/i);
      await user.click(favouriteButton);
      await delay(4000); // wait for nework request to complete
      expect(favouriteButton.textContent).toContain(
        `${event.favourite_count + 1}`
      );
    }
  );
  it(
    "should update attendee count when attend button is clicked",
    { timeout: 10000 },
    async () => {
      const { getButton, user, event, waitForEventToLoad } = renderComponent({
        attendee_id: null,
      });
      await waitForEventToLoad();
      const attendButton = await getButton(/attend/i);
      await user.click(attendButton);
      await delay(4000); // wait for nework request to complete
      expect(attendButton.textContent).toContain(`${event.attendee_count + 1}`);
    }
  );
});
