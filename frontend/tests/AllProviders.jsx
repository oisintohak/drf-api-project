import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { CurrentUserProvider } from "../src/providers/CurrentUserContext";
// import { CurrentUserProvider } from "../../src/providers/CurrentUserContext";

const AllProviders = ({ children, route }) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <CurrentUserProvider>{children}</CurrentUserProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default AllProviders;
