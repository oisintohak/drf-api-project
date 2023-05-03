import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";

function NavBar() {
  const currentUser = useCurrentUser();
  return (
    <Navbar>
      <Container>
        <NavLink to="/">
          <Navbar.Brand>Eventually</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {currentUser ? (
            <h1>Welcome {currentUser}</h1>
          ) : (
            <>
              <NavLink to="/login" className="mx-2">
                Login
              </NavLink>
              <NavLink to="/register" className="mx-2">
                Register
              </NavLink>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
