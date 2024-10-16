import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import Event from "../../src/components/Event";
import EventDetail from "../../src/pages/events/EventDetail";
import { server } from "../mocks/server";
import React from "react";

import { http, HttpResponse, delay } from "msw";
import { db } from "../mocks/db";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import AllProviders from "../AllProviders";
import { fa } from "@faker-js/faker";
import { MemoryRouter } from "react-router-dom";

describe("Event", () => {
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

    render(<Event {...event} />, { wrapper: AllProviders });

    return {
      event,
      user: userEvent.setup(),
      getButton: (label) => screen.findByRole("button", { name: label }),
    };
  };
  let eventId;

  beforeAll(() => {
    const event = db.event.create();
    eventId = event.id;
  });

  afterAll(() => {
    db.event.delete({ where: { id: { equals: eventId } } });
  });
  

  it("should render event information", async () => {
    const { event } = renderEvent();
    expect(
      await screen.findByText(new RegExp(event.title))
    ).toBeInTheDocument();
    expect(
      await screen.findByText(new RegExp(event.address))
    ).toBeInTheDocument();
  });

  it("should display attend button when attendee_id is null", async () => {
    const { getButton } = renderEvent({ attendee_id: null });
    expect(await getButton(/attend/i)).toBeInTheDocument();
  });

  // it("should update attendee count when attend button is clicked", async () => {
  //   const { getButton, user, event } = renderEvent({ attendee_id: null });
  //   const attendButton = await getButton(/attend/i);
  //   await user.click(attendButton);
  //   expect((await getButton(/attend/i)).textContent).toContain(
  //     `${event.attendee_count + 1}`
  //   );
  // });

  it("should display unattend button when attendee_id is not null", async () => {
    const { getButton } = renderEvent({ attendee_id: 1 });
    expect(await getButton(/unnattend/i)).toBeInTheDocument();
  });

  it("should display favourite button when favourite_id is null and is_creator is false", async () => {
    const { getButton } = renderEvent({
      favourite_id: null,
      is_creator: false,
    });
    expect(await getButton(/favourite/i)).toBeInTheDocument();
  });

  it("should display unfavourite button when favourite_id is not null and is_creator is false", async () => {
    const { getButton } = renderEvent({ favourite_id: 1, is_creator: false });
    expect(await getButton(/unfavourite/i)).toBeInTheDocument();
  });
});
