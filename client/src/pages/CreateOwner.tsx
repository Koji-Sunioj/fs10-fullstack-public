import { Col, Row, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import OwnerForm from "../components/OwnerForm";
import { getAllProperties } from "../redux/reducers/allproperties";
import { createOwner } from "../redux/reducers/createowner";
import { resetCreateOwner } from "../redux/reducers/createowner";
import { toggleModifiedTrue } from "../redux/reducers/propertyrefresh";
import { AppDispatch } from "../redux/store";
import { OwnerType, AppType } from "../types/types";

const CreateOwner = () => {
  const dispatch = useDispatch<AppDispatch>();
  const client = useSelector((state: AppType) => state.client);
  const properties = useSelector((state: AppType) => state.getAllProperties);
  const addOwner = useSelector((state: AppType) => state.addOwner);
  const token = JSON.parse(localStorage.getItem("token") as string);

  useEffect(() => {
    if (client.valid && client.data !== null && client.data.isAdmin) {
      dispatch(getAllProperties());
    }
    dispatch(resetCreateOwner());
  }, [client]);

  async function sendOwner(owner: Omit<OwnerType, "_id">) {
    await dispatch(createOwner({ token: token, data: owner }));
    dispatch(toggleModifiedTrue());
  }

  const amIAdmin = client.valid && client.data !== null && client.data.isAdmin;

  return (
    <>
      {amIAdmin ? (
        <>
          <h1>Create owner</h1>
          <OwnerForm sendOwner={sendOwner} properties={properties} />
          <Row style={{ textAlign: "center" }}>
            {addOwner.success && addOwner.data !== null && (
              <Alert variant="success">
                <Link to={`/owner/${addOwner.data._id}`}>
                  <h3>
                    {addOwner.message}. click here to see their information.
                  </h3>
                </Link>
              </Alert>
            )}
            {addOwner.error && (
              <Alert variant="danger">
                <h3>{addOwner.message}.</h3>
              </Alert>
            )}
          </Row>
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

export default CreateOwner;
