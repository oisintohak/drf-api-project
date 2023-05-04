import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
// import RegisterForm from "./pages/auth/Register";
import LoginForm from "./pages/auth/Login";
import Event from "./components/Event";
import EventList from "./pages/events/EventList";

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
              <EventList />
            </>
          )}
        />
        <Route exact path="/login" render={() => <LoginForm />} />
        {/* <Route exact path="/register" render={() => <RegisterForm />} /> */}
      </Switch>
    </div>
  );
}

export default App;
