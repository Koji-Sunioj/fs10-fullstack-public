import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { AppDispatch } from "../redux/store";
import { PropertyType, AppType } from "../types/types";
import { useSelector, useDispatch } from "react-redux";
import { getOwners } from "../redux/reducers/getowners";
import { crudRefresh } from "../redux/reducers/filterby";
import { createProperty } from "../redux/reducers/createproperty";
import { resetCreateProp } from "../redux/reducers/createproperty";

import PropertyForm from "../components/PropertyForm";
import CrudPropertyFeedback from "../components/CrudPropertyFeedback";

const CreateProperty = () => {
  const dispatch = useDispatch<AppDispatch>();
  const client = useSelector((state: AppType) => state.client);
  const owners = useSelector((state: AppType) => state.owners);
  const token = JSON.parse(localStorage.getItem("token") as string);
  const addProperty = useSelector((state: AppType) => state.createProperty);

  useEffect(() => {
    if (client.valid && client.data && client.data.isAdmin) {
      dispatch(getOwners());
    }
    dispatch(resetCreateProp());
  }, [client, dispatch]);

  const sendProperty = async (property: Omit<PropertyType, "_id">) => {
    await dispatch(createProperty({ token: token, data: property }));
    dispatch(crudRefresh());
  };

  const amIAdmin = client.valid && client.data && client.data.isAdmin;

  return (
    <>
      {amIAdmin ? (
        <>
          <h1>Create property</h1>
          <PropertyForm
            sendProperty={sendProperty}
            owners={owners}
            status={addProperty}
          />
          <CrudPropertyFeedback status={addProperty} />
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
