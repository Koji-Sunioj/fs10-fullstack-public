import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { AppDispatch } from "../redux/store";
import { useParams } from "react-router-dom";
import { getOwner, patchOwner, resetEdit } from "../redux/reducers/owner";
import { useSelector, useDispatch } from "react-redux";
import { allProperties } from "../redux/reducers/allproperties";
import { modifiedPropertyTrue } from "../redux/reducers/propertyrefresh";

import OwnerForm from "../components/OwnerForm";
import { OwnerType, AppType } from "../types/types";
import AdminActionFeedback from "../components/AdminActionFeedback";

const EditOwner = () => {
  const { ownerId } = useParams<string>();
  const dispatch = useDispatch<AppDispatch>();
  const { owner, client, getAllProperties } = useSelector(
    (state: AppType) => state
  );

  const token = JSON.parse(localStorage.getItem("token") as string);

  useEffect(() => {
    if (client.valid && client.data && client.data.isAdmin) {
      dispatch(resetEdit());
      dispatch(allProperties());
      dispatch(getOwner(ownerId as string));
    }
  }, [client, ownerId, dispatch]);

  const sendOwner = async (owner: Omit<OwnerType, "_id">) => {
    await dispatch(
      patchOwner({ token: token, ownerId: ownerId!, data: owner })
    );
    dispatch(modifiedPropertyTrue({ from: "owner" }));
  };
  const amIAdmin = client.valid && client.data && client.data.isAdmin;

  return (
    <>
      {amIAdmin ? (
        <>
          <h1>Edit Owner</h1>
          <OwnerForm
            sendOwner={sendOwner}
            properties={getAllProperties}
            owner={owner.data!}
            status={owner}
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

export default EditOwner;
