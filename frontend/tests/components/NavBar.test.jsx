import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import NavBar from "../../src/components/NavBar";
import { CurrentUserProvider } from "../../src/providers/CurrentUserContext";
import { server } from "../mocks/server";
import {db } from "../mocks/db";
import QueryProvider from "../../src/providers/QueryProvider.jsx";

describe.skip("NavBar", () => {
  const { user } = db;
  const renderNavBar = () => {
    render(
      <BrowserRouter>
        <QueryProvider>
          <CurrentUserProvider>
            <NavBar />
          </CurrentUserProvider>
        </QueryProvider>
      </BrowserRouter>
    );
    return {
      logoText: screen.getByRole("heading", { name: "Eventually" }),
      accountToggleButton: screen.getByRole("button", { name: "account" }),
      getLinks: async () => screen.findAllByRole("link"),
      getLink: async (label) => screen.findByRole("link", { name: label }),
      user: userEvent.setup(),
    };
  };
  it("should render the site name", () => {
    const { logoText } = renderNavBar();

    expect(logoText).toBeInTheDocument();
  });

  it.each(["profile", "create event", "logout"])(
    "should render the %s link in the account menu when logged in",
    async (label) => {
      const { accountToggleButton, user, getLink } = renderNavBar();
      await user.click(accountToggleButton);

      const link = await getLink(label);
      expect(link).toBeInTheDocument();
    }
  );
  it.each(["login", "register"])(
    "should render the %s link in the account menu when not logged in",
    async (label) => {
      server.use(
        http.get("api/auth/user/", () => {
          return new HttpResponse(
            { detail: "Authentication credentials were not provided." },
            { status: 401 }
          );
        })
      );
      server.use(
        http.get("api/auth/token/refresh/", () => {
          return new HttpResponse(
            {
              detail: "No valid refresh token found.",
              code: "token_not_valid",
            },
            { status: 401 }
          );
        })
      );

      const { accountToggleButton, user, getLink } = renderNavBar();
      await user.click(accountToggleButton);

      const link = await getLink(label);

      expect(link).toBeInTheDocument();
    }
  );
  it("should render the favourites link when logged in", async () => {
    const { getLink } = renderNavBar();
    expect(await getLink("favourites")).toBeInTheDocument();
  });
});
