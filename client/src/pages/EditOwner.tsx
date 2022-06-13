import { Row, Container, Alert, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import OwnerForm from "../components/OwnerForm";
import { getOwner } from "../redux/reducers/owner";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAllProperties } from "../redux/reducers/allproperties";

const EditOwner = () => {
  const { ownerId } = useParams();
  const dispatch = useDispatch();
  const client = useSelector((state: any) => state.client);
  const properties = useSelector((state: any) => state.getAllProperties);

  useEffect(() => {
    if (client.valid === true && client.data.isAdmin === true) {
      dispatch(getAllProperties());
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
      firstName:form.firstName.value[0].toUpperCase()  + form.firstName.value.substring(1).toLowerCase(),
      lastName: form.lastName.value[0].toUpperCase() + form.lastName.value.substring(1).toLowerCase(),
      biography: form.biography.value,
    };
    console.log(owner)
  }

  return (
    <Container>
      {client.valid && client.data.isAdmin ? (
        <>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <h1>Edit Owner</h1>
            </Col>
          </Row>
          <OwnerForm sendOwner={sendOwner} properties={properties}/>
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

export default EditOwner;
