import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CurrentUserProvider } from "./providers/CurrentUserContext.jsx";
import { ThemeToggleProvider } from "./providers/ThemeContext.jsx";
import "./index.css";
import { LocationProvider } from "./providers/LocationContext.jsx";
import QueryProvider from "./providers/QueryProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <QueryProvider>
      <CurrentUserProvider>
        <ThemeToggleProvider>
          <LocationProvider>
            <App />
          </LocationProvider>
        </ThemeToggleProvider>
      </CurrentUserProvider>
    </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
