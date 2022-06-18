import { Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import UserView from "../components/UserView";
import { AppDispatch } from "../redux/store";
import { AppType } from "../types/types";
const MyAccount = () => {
  const client = useSelector((state: AppType) => state.client);
  const amInotAdmin =
    client.valid && client.data !== null && !client.data.isAdmin;

  return (
    <>
      {amInotAdmin ? (
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
