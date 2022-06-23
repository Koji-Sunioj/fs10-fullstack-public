import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Col, Row, Button } from "react-bootstrap";

import { AppType } from "../types/types";
import UserView from "../components/UserView";

const AdminPage = () => {
  const { client } = useSelector((state: AppType) => state);

  return (
    <>
      {client.valid && client.data!.isAdmin ? (
        <>
          <UserView client={client}>
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
