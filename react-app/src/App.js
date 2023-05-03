import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" render={() => <><h1>home</h1></>} />
        <Route exact path="/login" render={() => <><h1>login</h1></>} />
        <Route exact path="/register" render={() => <><h1>register</h1></>} />
      </Switch>
    </div>
  );
}

export default App;
