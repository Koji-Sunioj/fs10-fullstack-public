import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { AppDispatch } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { allProperties } from "../redux/reducers/allproperties";
import { createOwner, resetOwnerEdit } from "../redux/reducers/owner";
import { modifiedPropertyTrue } from "../redux/reducers/propertyrefresh";

import OwnerForm from "../components/OwnerForm";
import { OwnerType, AppType } from "../types/types";
import AdminActionFeedback from "../components/AdminActionFeedback";

const CreateOwner = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { client, getAllProperties, owner } = useSelector(
    (state: AppType) => state
  );
  const token = JSON.parse(localStorage.getItem("token") as string);
  const amIAdmin = client.valid && client.data!.isAdmin;

  useEffect(() => {
    if (amIAdmin) {
      dispatch(resetOwnerEdit());
      dispatch(allProperties());
    }
  }, [amIAdmin, dispatch]);

  async function sendOwner(owner: Omit<OwnerType, "_id">) {
    await dispatch(createOwner({ token: token, data: owner }));
    dispatch(modifiedPropertyTrue({ from: "owner" }));
  }

  return (
    <>
      {amIAdmin ? (
        <>
          <h1>Create owner</h1>
          <OwnerForm
            sendOwner={sendOwner}
            allProperties={getAllProperties}
            submitted={owner.success}
          />
          <AdminActionFeedback status={owner} uri={"owner"} />
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
