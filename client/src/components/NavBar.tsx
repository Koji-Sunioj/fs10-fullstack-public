import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { Navbar, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { CredentialResponse } from "@react-oauth/google";
import { verifyGoogle } from "../redux/reducers/verifygoogle";
import { verifyToken, setFromGoogle } from "../redux/reducers/client";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import { AppType } from "../types/types";

const NavBar = () => {
  const googleAuth = useSelector((state: AppType) => state.googleAuth);
  const token = JSON.parse(localStorage.getItem("token") as string);
  const client = useSelector((state: AppType) => state.client);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (googleAuth.jwt) {
      dispatch(setFromGoogle({ user: googleAuth.user, valid: true }));
      localStorage.setItem("token", JSON.stringify(googleAuth.jwt));
    } else if (token && token.length) {
      dispatch(verifyToken(token));
    }
  }, [googleAuth, dispatch, token]);

  const googleSuccess = (response: CredentialResponse) => {
    const googleCred = response.credential;
    dispatch(verifyGoogle(googleCred!));
  };

  return (
    <Navbar bg="light">
      <Container fluid id="searchbar">
        <Link to={"/"} className="navbar-brand">
          Home
        </Link>
        {client.valid ? (
          client.data!.isAdmin ? (
            <Link to={"/admin"} className="navbar-brand">
              admin
            </Link>
          ) : (
            <Link to={"/my-account"} className="navbar-brand">
              my account
            </Link>
          )
        ) : (
          <GoogleOAuthProvider
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
          >
            <GoogleLogin onSuccess={googleSuccess} />
          </GoogleOAuthProvider>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
