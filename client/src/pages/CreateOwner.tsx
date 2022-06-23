import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { AppDispatch } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { allProperties } from "../redux/reducers/allproperties";
import { createOwner } from "../redux/reducers/createowner";
import { resetCreateOwner } from "../redux/reducers/createowner";
import { modifiedPropertyTrue } from "../redux/reducers/propertyrefresh";

import OwnerForm from "../components/OwnerForm";
import { OwnerType, AppType } from "../types/types";
import AdminActionFeedback from "../components/AdminActionFeedback";

const CreateOwner = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { client, addOwner, getAllProperties } = useSelector(
    (state: AppType) => state
  );
  const token = JSON.parse(localStorage.getItem("token") as string);

  useEffect(() => {
    if (client.valid && client.data !== null && client.data.isAdmin) {
      dispatch(allProperties());
    }
    dispatch(resetCreateOwner());
  }, [client, dispatch]);

  async function sendOwner(owner: Omit<OwnerType, "_id">) {
    await dispatch(createOwner({ token: token, data: owner }));
    dispatch(modifiedPropertyTrue({ from: "addOwner" }));
  }

  const amIAdmin = client.valid && client.data !== null && client.data.isAdmin;

  return (
    <>
      {amIAdmin ? (
        <>
          <h1>Create owner</h1>
          <OwnerForm
            sendOwner={sendOwner}
            properties={getAllProperties}
            status={addOwner}
          />
          <AdminActionFeedback status={addOwner} uri={"owner"} />
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
