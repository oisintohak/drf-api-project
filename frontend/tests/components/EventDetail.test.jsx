import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import delay from "delay";

import React from "react";
import EventDetail from "../../src/pages/events/EventDetail";

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { db } from "../mocks/db";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { CurrentUserProvider } from "../../src/providers/CurrentUserContext";
const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
describe("EventDetail", () => {
  let eventId;

  beforeAll(() => {
    const event = db.event.create({ id: 1 });
    eventId = event.id;
  });

  afterAll(() => {
    db.event.delete({ where: { id: { equals: eventId } } });
  });

  const renderEvent = (eventData) => {
    let event;
    if (eventData) {
      event = db.event.update({
        where: { id: { equals: eventId } },
        data: { ...eventData },
      });
    } else {
      event = db.event.findFirst({ where: { id: { equals: eventId } } });
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
    };
  };

  
  it(
    "should update favourite count when attend button is clicked",
    { timeout: 10000 },
    async () => {
      const { getButton, user, event, waitForEventToLoad } = renderEvent({
        favourite_id: null,
        is_creator: false
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
      const { getButton, user, event, waitForEventToLoad } = renderEvent({
        attendee_id: null,
        
      });
      await waitForEventToLoad();
      const attendButton = await getButton(/attend/i);
      await user.click(attendButton);
      await delay(4000); // wait for nework request to complete
      expect(attendButton.textContent).toContain(
        `${event.attendee_count + 1}`
      );
    }
  );
});
