import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { ThemeToggleProvider } from "./contexts/ThemeContext.jsx";
import "./index.css";
import { LocationProvider } from "./contexts/LocationContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CurrentUserProvider>
        <ThemeToggleProvider>
          <LocationProvider>
            <App />
          </LocationProvider>
        </ThemeToggleProvider>
      </CurrentUserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
