import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const MyAccount = () => {
  const client = useSelector((state: any) => state.client);
  return (
    <Container>
      <Row>
        {client.valid ? (
          <h1 style={{ textAlign: "center" }}>
            Welcome {client.data.firstName} {client.data.lastName}
          </h1>
        ) : (
          <p>no</p>
        )}
      </Row>
    </Container>
  );
};

export default MyAccount;
