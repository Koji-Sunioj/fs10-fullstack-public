import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { verifyToken } from "../redux/reducers/client";
import { useEffect } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { setFromGoogle } from "../redux/reducers/client";
import { useAppDispatch } from "../redux/store";
import { verifyGoogle } from "../redux/reducers/verifygoogle";

const NavBar = () => {
  const googleAuth = useSelector((state: any) => state.googleAuth);
  const token = JSON.parse(localStorage.getItem("token") as string);
  const client = useSelector((state: any) => state.client);
  const dispatch = useDispatch();
  const apiDispatch = useAppDispatch();
  console.log(token);
  console.log(client);

  useEffect(() => {
    if (googleAuth.jwt !== null) {
      dispatch(setFromGoogle({ user: googleAuth.user, valid: true }));
      localStorage.setItem("token", JSON.stringify(googleAuth.jwt));
    } else if (token && token.length) {
      apiDispatch(verifyToken(token));
    }
  }, [googleAuth]);

  const clientId =
    "590454976834-u7ot656u6f17u3seik97rsvj0rb3ktoh.apps.googleusercontent.com";

  function googleSuccess(response: any) {
    const googleCred = response.credential;
    dispatch(verifyGoogle(googleCred));
  }

  return (
    <Navbar bg="light">
      <Container fluid id="searchbar">
        <Link to={"/"} className="navbar-brand">
          Home
        </Link>
        {client.valid ? (
          client.data.isAdmin ? (
            <Link to={"/admin"} className="navbar-brand">
              admin
            </Link>
          ) : (
            <Link to={"/myaccount"} className="navbar-brand">
              my account
            </Link>
          )
        ) : (
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin onSuccess={googleSuccess} />
          </GoogleOAuthProvider>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
