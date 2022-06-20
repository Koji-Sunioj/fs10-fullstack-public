import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { getOwners } from "../redux/reducers/getowners";
import { getProperty } from "../redux/reducers/property";
import { updateProperty } from "../redux/reducers/updateproperty";
import { resetUpdateProp } from "../redux/reducers/updateproperty";
import { modifiedOwnerTrue } from "../redux/reducers/ownerrefresh";
import { modifiedPropertyTrue } from "../redux/reducers/propertyrefresh";

import PropertyForm from "../components/PropertyForm";
import { PropertyType, AppType } from "../types/types";
import AdminActionFeedback from "../components/AdminActionFeedback";

const EditProperty = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { propertyId } = useParams<string>();
  const client = useSelector((state: AppType) => state.client);
  const patchProperty = useSelector((state: AppType) => state.updateProperty);
  const owners = useSelector((state: AppType) => state.owners);
  const property = useSelector((state: AppType) => state.property);
  const token = JSON.parse(localStorage.getItem("token") as string);

  useEffect(() => {
    if (client.valid && client.data && client.data.isAdmin) {
      dispatch(getOwners());
      dispatch(getProperty(String(propertyId)));
      dispatch(resetUpdateProp());
    }
  }, [client, dispatch, propertyId]);

  async function sendProperty(property: Omit<PropertyType, "_id">) {
    await dispatch(
      updateProperty({ token: token, data: property, propertyId: propertyId! })
    );
    dispatch(modifiedPropertyTrue({ from: "updateProperty" }));
    dispatch(modifiedOwnerTrue({ from: "updateProperty" }));
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
            status={patchProperty}
          />
          <AdminActionFeedback status={patchProperty} uri={"property"} />
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
