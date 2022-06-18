import { Col, Row, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getOwners } from "../redux/reducers/getowners";
import { useEffect } from "react";
import { createProperty } from "../redux/reducers/createproperty";
import { Link } from "react-router-dom";
import { resetCreateProp } from "../redux/reducers/createproperty";
import { crudRefresh } from "../redux/reducers/filterby";
import { AppDispatch } from "../redux/store";
import PropertyForm from "../components/PropertyForm";
import { PropertyType, AppType } from "../types/types";

const CreateProperty = () => {
  const dispatch = useDispatch<AppDispatch>();
  const client = useSelector((state: AppType) => state.client);
  const owners = useSelector((state: AppType) => state.owners);
  const token = JSON.parse(localStorage.getItem("token") as string);
  const addProperty = useSelector((state: AppType) => state.createProperty);

  useEffect(() => {
    if (client.valid && client.data !== null && client.data.isAdmin) {
      dispatch(getOwners());
    }
    dispatch(resetCreateProp());
  }, [client]);

  async function sendProperty(property: Omit<PropertyType, "_id">) {
    await dispatch(createProperty({ token: token, data: property }));
    dispatch(crudRefresh());
  }

  const amIAdmin = client.valid && client.data !== null && client.data.isAdmin;

  return (
    <>
      {amIAdmin ? (
        <>
          <h1>Create property</h1>
          <PropertyForm sendProperty={sendProperty} owners={owners} />
          <Row style={{ textAlign: "center" }}>
            {addProperty.success && addProperty.data !== null && (
              <Alert variant="success">
                <Link to={`/property/${addProperty.data._id}`}>
                  <h3>{addProperty.message}. click here to see the listing.</h3>
                </Link>
              </Alert>
            )}
            {addProperty.error && (
              <Alert variant="danger">
                <h3>{addProperty.message}.</h3>
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

export default CreateProperty;
