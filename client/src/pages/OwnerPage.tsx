import { useEffect } from "react";
import { AppDispatch } from "../redux/store";
import { getOwner } from "../redux/reducers/owner";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { resetUpdateOwner } from "../redux/reducers/updateowner";
import { Row, Col, Button, Stack, Alert } from "react-bootstrap";
import { modifiedPropertyTrue } from "../redux/reducers/propertyrefresh";
import { deleteOwner, resetDeleteOwner } from "../redux/reducers/deleteowner";
import { modifiedOwnerFalse } from "../redux/reducers/ownerrefresh";

import { AppType } from "../types/types";

const OwnerPage = () => {
  const navigate = useNavigate();
  const { ownerId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const owner = useSelector((state: AppType) => state.owner);
  const client = useSelector((state: AppType) => state.client);
  const token = JSON.parse(localStorage.getItem("token") as string);
  const editOwner = useSelector((state: AppType) => state.updateOwner);
  const removeOwner = useSelector((state: AppType) => state.deleteOwner);

  useEffect(() => {
    if (owner.data === null || (owner.data && owner.data._id !== ownerId)) {
      dispatch(resetDeleteOwner());
      dispatch(resetUpdateOwner());
      dispatch(getOwner(ownerId as string));
    }
    dispatch(modifiedOwnerFalse());
  }, [ownerId, dispatch, owner.data]);

  const kickOwner = async (ownerId: string) => {
    await dispatch(deleteOwner({ token: token, ownerId: ownerId }));
    dispatch(modifiedPropertyTrue({ from: "deleteOwner" }));
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  const amIAdmin = client.valid && client.data !== null && client.data.isAdmin;
  const isRemoved = removeOwner.success || removeOwner.error;
  return (
    <>
      {owner.data !== null && (
        <>
          <h2>Owner overview</h2>
          <Row style={{ backgroundColor: "white" }}>
            <Col>
              <h3>
                {owner.data.firstName} {owner.data.lastName}
              </h3>
              <p>{owner.data.biography}</p>
              <p>speaks: {owner.data.languages.join(", ")}</p>
              {amIAdmin && (
                <Stack direction="horizontal" gap={3}>
                  <Button
                    variant="danger"
                    onClick={() => {
                      kickOwner(ownerId!);
                    }}
                  >
                    Delete owner
                  </Button>
                  <Link to={`/admin/edit-owner/${ownerId}`}>
                    <Button variant="primary">Edit owner</Button>
                  </Link>
                </Stack>
              )}
            </Col>
          </Row>
          {isRemoved && (
            <Row style={{ textAlign: "center", padding: "0px" }}>
              <Alert variant={removeOwner.success ? "success" : "danger"}>
                <h3>{removeOwner.message}</h3>
              </Alert>
            </Row>
          )}
          {owner.data.properties.length > 0 && (
            <>
              <h2>properties</h2>
              {owner.data.properties.map((property) => (
                <Row style={{ backgroundColor: "white" }} key={property._id}>
                  <Link to={`/property/${property._id}`}>
                    <h3>
                      {property.title} in {property.location}
                    </h3>
                  </Link>
                </Row>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

export default OwnerPage;
