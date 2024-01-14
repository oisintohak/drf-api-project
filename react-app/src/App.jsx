import { Routes, Route } from "react-router-dom";
import { CssBaseline, Stack } from "@mui/material";
import NavBar from "./components/NavBar";
import RegisterForm from "./pages/auth/Register";
import LoginForm from "./pages/auth/Login";
import EventList from "./pages/events/EventList";
import CreateEventForm from "./pages/events/CreateEventForm";
import EventDetail from "./pages/events/EventDetail";
import EventMap from "./pages/events/EventMap";
import EventMap2 from "./pages/events/EventMap2";
import EditEventForm from "./pages/events/EditEventForm";
import GooglePlacesAutocomplete from "./utils/GooglePlacesAutocomplete";

function App() {
  return (
    <Stack>
      <CssBaseline />
      <NavBar />
      <Stack>
        <Routes>
          <Route exact path="/" element={<EventMap />} />
          <Route exact path="/map-two" element={<EventMap2 />} />
          <Route exact path="/test" element={<GooglePlacesAutocomplete />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/register" element={<RegisterForm />} />
          <Route exact path="/events/:id" element={<EventDetail />} />
          <Route exact path="/events/" element={<EventList />} />
          <Route exact path="/create-event" element={<CreateEventForm />} />
          <Route exact path="/events/:id/edit" element={<EditEventForm />} />
        </Routes>
      </Stack>
    </Stack>
  );
}

export default App;
