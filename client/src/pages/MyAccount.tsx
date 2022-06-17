import { Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMyReservations } from "../redux/reducers/myreservations";
import UserView from "../components/UserView";
import { AppDispatch } from "../redux/store";
import { AppType } from "../types/types";
const MyAccount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const client = useSelector((state: AppType) => state.client);

  useEffect(() => {
    if (client.valid && client.data !== null) {
      dispatch(getMyReservations(client.data._id));
    }
  }, [client]);

  const amInotAdmin =
    client.valid && client.data !== null && !client.data.isAdmin;

  return (
    <>
      {amInotAdmin ? (
        <>
          <UserView client={client.data!} />
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
