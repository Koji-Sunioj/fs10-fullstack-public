import { Col, Row, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMyReservations } from "../redux/reducers/myreservations";
import { resetUpdateUser } from "../redux/reducers/updateuser";
import UserView from "../components/UserView";

const MyAccount = () => {
  const dispatch = useDispatch();
  const updateName = useSelector((state: any) => state.updateUser);
  const client = useSelector((state: any) => state.client);

  useEffect(() => {
    if (client.valid) {
      dispatch(getMyReservations(client.data._id));
    }
  }, [client]);

  return (
    <>
      {client.valid && !client.data.isAdmin ? (
        <>
          <UserView client={client.data} />
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
