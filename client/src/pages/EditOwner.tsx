import { Row, Container, Alert, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import OwnerForm from "../components/OwnerForm";
import { getOwner } from "../redux/reducers/owner";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAllProperties } from "../redux/reducers/allproperties";
import { updateOwner } from "../redux/reducers/updateowner";
import { Link } from "react-router-dom";
import { resetUpdateOwner } from "../redux/reducers/updateowner";

const EditOwner = () => {
  const { ownerId } = useParams();
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token") as string);
  const client = useSelector((state: any) => state.client);
  const properties = useSelector((state: any) => state.getAllProperties);
  const owner = useSelector((state: any) => state.owner);
  const editOwner = useSelector((state: any) => state.updateOwner);

  useEffect(() => {
    if (client.valid === true && client.data.isAdmin === true) {
      dispatch(resetUpdateOwner());
      dispatch(getAllProperties());
      dispatch(getOwner(ownerId));
    }
  }, [client]);

  function sendOwner(event: any) {
    event.preventDefault();
    const form = event.target;
    const owner = {
      languages: form.languages.value.split(","),
      properties: Array.from(form.properties)
        .filter((option: any) => {
          return option.selected === true;
        })
        .map((property: any) => property.value),
      firstName:
        form.firstName.value[0].toUpperCase() +
        form.firstName.value.substring(1).toLowerCase(),
      lastName:
        form.lastName.value[0].toUpperCase() +
        form.lastName.value.substring(1).toLowerCase(),
      biography: form.biography.value,
    };
    dispatch(updateOwner({ token: token, ownerId: ownerId, data: owner }));
  }

  return (
    <>
      {client.valid && client.data.isAdmin ? (
        <>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <h1>Edit Owner</h1>
            </Col>
          </Row>
          <OwnerForm
            sendOwner={sendOwner}
            properties={properties}
            owner={owner.data}
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
