import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { getOwners } from "../redux/reducers/getowners";
import { modifiedOwnerTrue } from "../redux/reducers/ownerrefresh";
import {
  getProperty,
  updateProperty,
  resetPropertyEdit,
} from "../redux/reducers/property";

import PropertyForm from "../components/PropertyForm";
import { PropertyType, AppType } from "../types/types";
import AdminActionFeedback from "../components/AdminActionFeedback";

const EditProperty = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { propertyId } = useParams<string>();
  const { client, owners, property } = useSelector((state: AppType) => state);
  const token = JSON.parse(localStorage.getItem("token") as string);
  const amIAdmin = client.valid && client.data!.isAdmin;

  useEffect(() => {
    if (amIAdmin) {
      dispatch(getOwners());
      dispatch(getProperty(String(propertyId)));
      dispatch(resetPropertyEdit());
    }
  }, [amIAdmin, dispatch, propertyId]);

  async function sendProperty(property: Omit<PropertyType, "_id">) {
    await dispatch(
      updateProperty({ token: token, data: property, propertyId: propertyId! })
    );
    dispatch(modifiedOwnerTrue({ from: "property" }));
  }

  return (
    <>
      {amIAdmin ? (
        <>
          <h1>Edit property</h1>
          <PropertyForm
            sendProperty={sendProperty}
            allOwners={owners}
            property={property.data!}
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

export default EditProperty;
