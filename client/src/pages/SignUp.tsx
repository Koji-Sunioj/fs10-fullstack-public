import { Container, Row, Form, Button } from "react-bootstrap";

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
const SignUp = () => {
  const clientId =
    "590454976834-u7ot656u6f17u3seik97rsvj0rb3ktoh.apps.googleusercontent.com";

  async function googleSuccess(response: any) {
    const googleCred = response.credential;
    const url = "http://localhost:5000/google-login";
    const jwt = await fetch(url, {
      headers: {
        Authorization: `Bearer ${googleCred}`,
        "Content-Type": "application/json",
      },
      method: "post",
    }).then((resp) => resp.json());

    localStorage.setItem("token", JSON.stringify(jwt));
  }
  //const token = JSON.parse(localStorage.getItem("token") as string);
  //console.log(`Bearer ${token.token}`);

  return (
    <Container>
      <Row>
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin onSuccess={googleSuccess} />
        </GoogleOAuthProvider>
      </Row>
    </Container>
  );
};

export default SignUp;

/*<Form className="form">
          <h1>Sign Up</h1>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="First name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Last name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
            <Link to={"/"}>already have an account? sign in!</Link>
          </div>
         
        </Form> */
