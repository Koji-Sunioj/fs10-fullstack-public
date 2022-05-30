import { Container, Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <Container>
      <Row>
        <Form className="form">
          <h1>Sign In</h1>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button type="submit">Log In</Button>
            <Link to={"/signup"}>don't have an account yet? sign up!</Link>
          </div>
        </Form>
      </Row>
    </Container>
  );
};

export default SignIn;
