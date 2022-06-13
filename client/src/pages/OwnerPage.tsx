import { useParams, Link,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Container, Row, Col, Button, Stack, Alert} from "react-bootstrap";
import { getOwner } from "../redux/reducers/owner";
import { useEffect } from "react";
import { deleteOwner } from "../redux/reducers/deleteowner";

const OwnerPage = () => {
  const { ownerId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token") as string);
  const client = useSelector((state: any) => state.client);
  const owner = useSelector((state: any) => state.owner);
  const removeOwner = useSelector((state:any) => state.deleteOwner)

  useEffect(() => {
    dispatch(getOwner(ownerId));
  }, [ownerId]);

  function test(ownerId:string)
  {
    dispatch(deleteOwner({token:token,ownerId:ownerId}))
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }


  return (
    <Container>
      {owner.data !== null && (
        <>
          <Row style={{ textAlign: "center" }}>
            <h2>Owner overview</h2>
          </Row>
          <Row style={{ backgroundColor: "white" }}>
            <Col>
              <h2>
                {owner.data.firstName} {owner.data.lastName}
              </h2>
              <p>{owner.data.biography}</p>
              <p>speaks: {owner.data.languages.join(", ")}</p>
              {client.valid && client.data.isAdmin && (
                <Stack direction="horizontal" gap={3}>
                  <Button variant="danger" onClick={()=>{test(ownerId!)}}>Delete owner</Button>
                  <Link to={`/admin/edit-owner/${ownerId}`}>
                    <Button variant="primary">Edit owner</Button>
                  </Link>
                </Stack>
              )}
            </Col>
          </Row>

          <Row style={{ textAlign: "center" }}>
            {removeOwner.success && (
              <Alert variant="success">
                <h3>{removeOwner.message}</h3>
              </Alert>
            )}
            {removeOwner.error && (
              <Alert variant="danger">
                <h3>{removeOwner.message}</h3>
              </Alert>
            )}
          </Row>


          {owner.data.properties.length > 0 && (
            <>
              <Row style={{ textAlign: "center" }}>
                <h2>properties</h2>
              </Row>
              {owner.data.properties.map((property: any) => (
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
    </Container>
  );
};

export default OwnerPage;
