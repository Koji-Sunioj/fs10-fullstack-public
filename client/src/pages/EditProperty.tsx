import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { getOwners } from "../redux/reducers/getowners";
import { modifiedOwnerTrue } from "../redux/reducers/ownerrefresh";
import PropertyForm from "../components/PropertyForm";
import { PropertyType, AppType } from "../types/types";
import AdminActionFeedback from "../components/AdminActionFeedback";
import {
  getProperty,
  updateProperty,
  resetEdit,
} from "../redux/reducers/property";

const EditProperty = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { propertyId } = useParams<string>();
  const client = useSelector((state: AppType) => state.client);
  const owners = useSelector((state: AppType) => state.owners);
  const property = useSelector((state: AppType) => state.property);
  const token = JSON.parse(localStorage.getItem("token") as string);

  useEffect(() => {
    if (client.valid && client.data && client.data.isAdmin) {
      dispatch(getOwners());
      dispatch(getProperty(String(propertyId)));
      dispatch(resetEdit());
    }
  }, [client, dispatch, propertyId]);

  async function sendProperty(property: Omit<PropertyType, "_id">) {
    await dispatch(
      updateProperty({ token: token, data: property, propertyId: propertyId! })
    );
    dispatch(modifiedOwnerTrue({ from: "property" }));
  }

  const amIAdmin = client.valid && client.data && client.data.isAdmin;
  return (
    <>
      {amIAdmin ? (
        <>
          <h1>Edit property</h1>
          <PropertyForm
            sendProperty={sendProperty}
            owners={owners}
            property={property.data!}
            status={property.success}
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

//<AdminActionFeedback status={patchProperty} uri={"property"} />
export default EditProperty;
