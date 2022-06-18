import { Row, Alert, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import OwnerForm from "../components/OwnerForm";
import { getOwner } from "../redux/reducers/owner";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAllProperties } from "../redux/reducers/allproperties";
import { updateOwner } from "../redux/reducers/updateowner";
import { Link } from "react-router-dom";
import { resetUpdateOwner } from "../redux/reducers/updateowner";
import { toggleModifiedTrue } from "../redux/reducers/propertyrefresh";
import { AppDispatch } from "../redux/store";
import { OwnerType, AppType } from "../types/types";

const EditOwner = () => {
  const { ownerId } = useParams<string>();
  const dispatch = useDispatch<AppDispatch>();
  const token = JSON.parse(localStorage.getItem("token") as string);
  const client = useSelector((state: AppType) => state.client);
  const properties = useSelector((state: AppType) => state.getAllProperties);
  const owner = useSelector((state: AppType) => state.owner);
  const editOwner = useSelector((state: AppType) => state.updateOwner);

  useEffect(() => {
    if (
      client.valid === true &&
      client.data !== null &&
      client.data.isAdmin === true
    ) {
      dispatch(resetUpdateOwner());
      dispatch(getAllProperties());
      dispatch(getOwner(ownerId as string));
    }
  }, [client]);

  async function sendOwner(owner: Omit<OwnerType, "_id">) {
    await dispatch(
      updateOwner({ token: token, ownerId: ownerId!, data: owner })
    );
    dispatch(toggleModifiedTrue());
  }

  const amIAdmin = client.valid && client.data !== null && client.data.isAdmin;

  return (
    <>
      {amIAdmin ? (
        <>
          <h1>Edit Owner</h1>
          <OwnerForm
            sendOwner={sendOwner}
            properties={properties}
            owner={owner.data!}
          />
          <Row style={{ textAlign: "center" }}>
            {editOwner.success && (
              <Alert variant="success">
                <Link to={`/owner/${ownerId}`}>
                  <h3>{editOwner.message}. click here to see the update.</h3>
                </Link>
              </Alert>
            )}
            {editOwner.error && (
              <Alert variant="danger">
                <h3>{editOwner.message}.</h3>
              </Alert>
            )}
          </Row>
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
