import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { AppDispatch } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { getAllProperties } from "../redux/reducers/allproperties";
import { createOwner } from "../redux/reducers/createowner";
import { resetCreateOwner } from "../redux/reducers/createowner";
import { toggleModifiedTrue } from "../redux/reducers/propertyrefresh";

import OwnerForm from "../components/OwnerForm";
import { OwnerType, AppType } from "../types/types";
import AdminActionFeedback from "../components/AdminActionFeedback";

const CreateOwner = () => {
  const dispatch = useDispatch<AppDispatch>();
  const client = useSelector((state: AppType) => state.client);
  const addOwner = useSelector((state: AppType) => state.addOwner);
  const token = JSON.parse(localStorage.getItem("token") as string);
  const properties = useSelector((state: AppType) => state.getAllProperties);

  useEffect(() => {
    if (client.valid && client.data !== null && client.data.isAdmin) {
      dispatch(getAllProperties());
    }
    dispatch(resetCreateOwner());
  }, [client, dispatch]);

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
          <OwnerForm
            sendOwner={sendOwner}
            properties={properties}
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
