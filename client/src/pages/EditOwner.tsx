import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { AppDispatch } from "../redux/store";
import { useParams } from "react-router-dom";
import { getOwner } from "../redux/reducers/owner";
import { useSelector, useDispatch } from "react-redux";
import { updateOwner } from "../redux/reducers/updateowner";
import { resetUpdateOwner } from "../redux/reducers/updateowner";
import { getAllProperties } from "../redux/reducers/allproperties";
import { toggleModifiedTrue } from "../redux/reducers/propertyrefresh";

import OwnerForm from "../components/OwnerForm";
import { OwnerType, AppType } from "../types/types";
import CrudOwnerFeedBack from "../components/CrudOwnerFeedback";

const EditOwner = () => {
  const { ownerId } = useParams<string>();
  const dispatch = useDispatch<AppDispatch>();
  const owner = useSelector((state: AppType) => state.owner);
  const client = useSelector((state: AppType) => state.client);
  const token = JSON.parse(localStorage.getItem("token") as string);
  const editOwner = useSelector((state: AppType) => state.updateOwner);
  const properties = useSelector((state: AppType) => state.getAllProperties);

  useEffect(() => {
    if (client.valid && client.data && client.data.isAdmin) {
      dispatch(resetUpdateOwner());
      dispatch(getAllProperties());
      dispatch(getOwner(ownerId as string));
    }
  }, [client, ownerId, dispatch]);

  const sendOwner = async (owner: Omit<OwnerType, "_id">) => {
    await dispatch(
      updateOwner({ token: token, ownerId: ownerId!, data: owner })
    );
    dispatch(toggleModifiedTrue());
  };

  const amIAdmin = client.valid && client.data && client.data.isAdmin;

  return (
    <>
      {amIAdmin ? (
        <>
          <h1>Edit Owner</h1>
          <OwnerForm
            sendOwner={sendOwner}
            properties={properties}
            owner={owner.data!}
            status={editOwner}
          />
          <CrudOwnerFeedBack status={editOwner} />
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
