import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropertyFilter from "./PropertyFilter";

const NavBar = () => {
  return (
    <Navbar bg="light">
      <Container fluid id="searchbar">
        <Link to={"/"} className="navbar-brand">
          Home
        </Link>
        <PropertyFilter />
        <Link to={"/login"} className="navbar-brand">
          sign in
        </Link>
      </Container>
    </Navbar>
  );
};

export default NavBar;
