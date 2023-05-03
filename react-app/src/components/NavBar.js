import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import { axiosReq } from "../api/axiosDefaults";
import NavbarBrand from "react-bootstrap/esm/NavbarBrand";

function NavBar() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleLogout = async () => {
    try {
      await axiosReq.post("auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Navbar>
      <Container>
        <NavLink to="/">
          <Navbar.Brand>Eventually</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {currentUser ? (
            <>
              <Navbar.Text>Welcome, {currentUser.username}</Navbar.Text>
              <NavLink to="/" onClick={handleLogout} className="mx-2">
                Logout
              </NavLink>
            </>
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
