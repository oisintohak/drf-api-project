import React from "react";
import { CssBaseline, Stack } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import LoginForm from "./pages/auth/Login";
import RegisterForm from "./pages/auth/Register";
import CreateEventForm from "./pages/events/CreateEventForm";
import EditEventForm from "./pages/events/EditEventForm";
import EventDetail from "./pages/events/EventDetail";
import EventList from "./pages/events/EventList";
import EventMap from "./pages/events/EventMap";
import HomePage from "./pages/events/HomePage";
import ProfilePage from "./pages/profiles/ProfilePage";
import EditProfileForm from "./pages/profiles/EditProfileForm";


function App() {
  const currentUser = useCurrentUser();
  const userId = currentUser?.pk || ""
  return (
    <Stack>
      <CssBaseline />
      <NavBar />
      <Stack sx={{mt: 7}}>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/register" element={<RegisterForm />} />
          <Route exact path="/profiles/:id" element={<ProfilePage />} />
          <Route exact path="/profiles/:id/edit" element={<EditProfileForm />} />
          <Route exact path="/map" element={<EventMap />} />
          <Route exact path="/events" element={<EventList />} />
          <Route exact path="/favourites" element={<EventList filter={`&favourites__user=${userId}`} />} />
          <Route exact path="/events/:id" element={<EventDetail />} />
          <Route exact path="/create-event" element={<CreateEventForm />} />
          <Route exact path="/events/:id/edit" element={<EditEventForm />} />
        </Routes>
      </Stack>
    </Stack>

  );
}

export default App;
