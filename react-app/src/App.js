import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import RegisterForm from "./pages/auth/Register";
import LoginForm from "./pages/auth/Login";
import EventList from "./pages/events/EventList";
import CreateEventForm from "./pages/events/CreateEventForm";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <>
              <h1>home</h1>
              {/* <EventList /> */}
            </>
          )}
        />
        <Route exact path="/login" render={() => <LoginForm />} />
        <Route exact path="/register" render={() => <RegisterForm />} />
        <Route exact path="/create-event" render={() => <CreateEventForm />} />
        
      </Switch>
    </div>
  );
}

export default App;
