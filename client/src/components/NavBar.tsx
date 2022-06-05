import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { verifyToken } from "../redux/reducers/client";
import { useEffect } from "react";

const NavBar = () => {
  console.log("invoked");
  const token = JSON.parse(localStorage.getItem("token") as string);
  const client = useSelector((state: any) => state.client);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token && token.token.length) {
      dispatch(verifyToken(token.token));
    }
  }, []);

  return (
    <Navbar bg="light">
      <Container fluid id="searchbar">
        <Link to={"/"} className="navbar-brand">
          Home
        </Link>
        {client.valid ? (
          <Link to={"/myaccount"} className="navbar-brand">
            my account
          </Link>
        ) : (
          <Link to={"/signup"} className="navbar-brand">
            sign in
          </Link>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
