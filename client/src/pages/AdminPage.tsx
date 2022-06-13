import { Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserView from "../components/UserView";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMyReservations } from "../redux/reducers/myreservations";

const AdminPage = () => {
  const dispatch = useDispatch();
  const client = useSelector((state: any) => state.client);

  useEffect(() => {
    if (client.valid) {
      dispatch(getMyReservations(client.data._id));
    }
  }, [client]);

  console.log(client);

  return (
    <>
      {client.valid && client.data.isAdmin ? (
        <>
          <UserView client={client.data}>
            <h2>Actions</h2>
            <Row style={{ backgroundColor: "white" }}>
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Link to={"/admin/create-property"}>
                  <Button variant="link" size="lg">
                    Create a property
                  </Button>
                </Link>
                <Link to={"/admin/create-owner"}>
                  <Button variant="link" size="lg">
                    Create a owner
                  </Button>
                </Link>
              </span>
            </Row>
          </UserView>
        </>
      ) : (
        <Row style={{ textAlign: "center" }}>
          <Col>
            <h2>no authorization for this view</h2>
          </Col>
        </Row>
      )}
    </>
  );
};

export default AdminPage;
