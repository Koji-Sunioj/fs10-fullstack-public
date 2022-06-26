import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { AppDispatch } from "../redux/store";
import { PropertyType, AppType } from "../types/types";
import { useSelector, useDispatch } from "react-redux";
import { getOwners } from "../redux/reducers/getowners";
import { createProperty, resetPropertyEdit } from "../redux/reducers/property";
import { modifiedOwnerTrue } from "../redux/reducers/ownerrefresh";

import PropertyForm from "../components/PropertyForm";
import AdminActionFeedback from "../components/AdminActionFeedback";

const CreateProperty = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { client, owners, property } = useSelector((state: AppType) => state);
  const token = JSON.parse(localStorage.getItem("token") as string);
  const amIAdmin = client.valid && client.data!.isAdmin;

  useEffect(() => {
    dispatch(resetPropertyEdit());
    if (amIAdmin) {
      dispatch(getOwners());
    }
  }, [amIAdmin, dispatch]);

  const sendProperty = async (property: Omit<PropertyType, "_id">) => {
    await dispatch(createProperty({ token: token, data: property }));
    dispatch(modifiedOwnerTrue({ from: "property" }));
  };

  return (
    <>
      {amIAdmin ? (
        <>
          <h1>Create property</h1>
          <PropertyForm
            sendProperty={sendProperty}
            allOwners={owners}
            submitted={property.success}
          />
          <AdminActionFeedback status={property} uri={"property"} />
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
