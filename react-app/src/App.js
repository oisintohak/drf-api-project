import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import RegisterForm from "./pages/auth/Register";
import LoginForm from "./pages/auth/Login";
import EventList from "./pages/events/EventList";
import CreateEventForm from "./pages/events/CreateEventForm";
import EventDetail from "./pages/events/EventDetail";
import { CssBaseline, Stack } from "@mui/material";
import EventMap from "./pages/events/EventMap";
import EditEventForm from "./pages/events/EditEventForm";

function App() {
  return (
    <Stack>
      <CssBaseline />
      <NavBar />
      <Stack>
        <Switch>
          <Route exact path="/" render={() => <EventMap />} />
          <Route exact path="/login" render={() => <LoginForm />} />
          <Route exact path="/register" render={() => <RegisterForm />} />
          <Route exact path="/events/:id" render={() => <EventDetail />} />
          <Route exact path="/events/" render={() => <EventList />} />
          <Route
            exact
            path="/create-event"
            render={() => <CreateEventForm />}
          />
          <Route
            exact
            path="/events/:id/edit"
            render={() => <EditEventForm />}
          />
        </Switch>
      </Stack>
    </Stack>
  );
}

export default App;
