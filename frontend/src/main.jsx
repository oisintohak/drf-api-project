import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { ThemeToggleProvider } from "./contexts/ThemeContext.jsx";
import { ThemeProvider} from '@mui/material/styles';
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CurrentUserProvider>
        <ThemeToggleProvider>
        <App />
        </ThemeToggleProvider>
      </CurrentUserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
