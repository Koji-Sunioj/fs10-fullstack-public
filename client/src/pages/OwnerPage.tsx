import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button, Stack, Alert } from "react-bootstrap";
import { getOwner } from "../redux/reducers/owner";
import { useEffect } from "react";
import { deleteOwner, resetDeleteOwner } from "../redux/reducers/deleteowner";
import { resetUpdateOwner } from "../redux/reducers/updateowner";
import { toggleModifiedTrue } from "../redux/reducers/propertyrefresh";
import { AppDispatch } from "../redux/store";
import { AppType } from "../types/types";

const OwnerPage = () => {
  const { ownerId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token") as string);
  const client = useSelector((state: AppType) => state.client);
  const owner = useSelector((state: AppType) => state.owner);
  const removeOwner = useSelector((state: AppType) => state.deleteOwner);
  const editOwner = useSelector((state: AppType) => state.updateOwner);

  useEffect(() => {
    if (
      owner.data === null ||
      (owner.data && owner.data._id !== ownerId) ||
      editOwner.success
    ) {
      dispatch(resetDeleteOwner());
      dispatch(resetUpdateOwner());
      dispatch(getOwner(ownerId as string));
    }
  }, [ownerId]);

  async function test(ownerId: string) {
    await dispatch(deleteOwner({ token: token, ownerId: ownerId }));
    dispatch(toggleModifiedTrue());
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }

  console.log(owner.data);

  const amIAdmin = client.valid && client.data !== null && client.data.isAdmin;
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
                      test(ownerId!);
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

          {removeOwner.success && (
            <Row style={{ textAlign: "center" }}>
              <Alert variant="success">
                <h3>{removeOwner.message}</h3>
              </Alert>
            </Row>
          )}
          {removeOwner.error && (
            <Row style={{ textAlign: "center" }}>
              <Alert variant="danger">
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
                    <p>
                      {property.title} in {property.location}
                    </p>
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
