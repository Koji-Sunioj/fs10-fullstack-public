import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";

import { AppType } from "../types/types";
import UserView from "../components/UserView";

const MyAccount = () => {
  const client = useSelector((state: AppType) => state.client);

  return (
    <>
      {client.valid ? (
        <>
          <UserView client={client} />
        </>
      ) : (
        <Row style={{ textAlign: "center" }}>
          <Col>
            <h2>
              looks like you're not signed in or don't have an account with us
            </h2>
          </Col>
        </Row>
      )}
    </>
  );
};

export default MyAccount;
