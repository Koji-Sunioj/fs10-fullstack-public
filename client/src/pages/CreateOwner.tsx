import { Col, Container, Row, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import OwnerForm from "../components/OwnerForm";
import { getAllProperties } from "../redux/reducers/allproperties";
import { createOwner } from "../redux/reducers/createowner";

const CreateOwner = () => {
  const dispatch = useDispatch();
  const client = useSelector((state: any) => state.client);
  const properties = useSelector((state: any) => state.getAllProperties);
  const addOwner = useSelector((state: any) => state.addOwner);
  const token = JSON.parse(localStorage.getItem("token") as string);

  console.log(properties);
  console.log(addOwner);
  //const add = useSelector((state: any) => state.createProp);

  useEffect(() => {
    if (client.valid === true && client.data.isAdmin === true) {
      dispatch(getAllProperties());
      // dispatch(resetCreateProp());
    }
  }, [client]);

  async function sendOwner(event: any) {
    event.preventDefault();
    const form = event.target;
    const owner = {
      languages: form.languages.value.split(","),
      properties: Array.from(form.properties)
        .filter((option: any) => {
          return option.selected === true;
        })
        .map((property: any) => property.value),
      firstName: form.firstName.value.toUpperCase() + form.firstName.value.substring(1).toLowerCase(),
      lastName: form.lastName.value.toUpperCase() + form.lastName.value.substring(1).toLowerCase(),
      biography: form.biography.value,
    };

    dispatch(createOwner({ token: token, data: owner }));
  }

  return (
    <Container>
      {client.valid && client.data.isAdmin ? (
        <>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <h1>Create owner</h1>
            </Col>
          </Row>
          <OwnerForm sendOwner={sendOwner} properties={properties} />
          <Row style={{ textAlign: "center" }}>
            {addOwner.success && (
              <Alert variant="success">
                <Link to={`/owner/${addOwner.data._id}`}>
                  <h3>{addOwner.message}. click here to see their information.</h3>
                </Link>
              </Alert>
            )}
            {addOwner.error && (
              <Alert variant="danger">
                <h3>{addOwner.message}.</h3>
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
    </Container>
  );
};

export default CreateOwner;
