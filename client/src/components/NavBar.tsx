import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="light">
      <Container fluid id="searchbar">
        <Link to={"/"} className="navbar-brand">
          Home
        </Link>

        <Link to={"/login"} className="navbar-brand">
          sign in
        </Link>
      </Container>
    </Navbar>
  );
};

export default NavBar;
