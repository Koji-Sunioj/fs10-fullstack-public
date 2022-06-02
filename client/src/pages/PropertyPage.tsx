import { useParams } from "react-router-dom";
import { AppState } from "../types/types";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPropery } from "../redux/reducers/property";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import DatePicker from "react-date-picker";

const PropertyPage = () => {
  let { propertyId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPropery(propertyId));
  }, [propertyId]);

  const property = useSelector((state: any) => state.property);

  return (
    <Container>
      {property.loading && (
        <Row>
          <Col style={{ textAlign: "center" }}>
            <div className="property">
              <h3>Loading</h3>
            </div>
          </Col>
        </Row>
      )}
      {property.data && property.data._id === propertyId && (
        <>
          <Row style={{ backgroundColor: "white" }}>
            <Col md={6}>
              <h1>{property.data.title}</h1>
              <p>{property.data.description}</p>
              <p>
                <strong>type: {property.data.category}</strong>
              </p>
              <p>
                <strong>
                  price per night: &euro;
                  {property.data.nightlyRate.toFixed(2)}
                </strong>
              </p>
              <p>
                <strong>rooms: {property.data.rooms}</strong>
              </p>
              <p>
                <strong>location: {property.data.location}</strong>
              </p>
              <p>
                <strong>
                  {new Date(property.data.buildDate).getUTCFullYear()}
                </strong>
              </p>
            </Col>
            <Col style={{ backgroundColor: "white" }} md={6}>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <DatePicker value={new Date()} format={"y-MM-dd"} />
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
          <Row style={{ backgroundColor: "white" }}>
            <h3>Your host(s)</h3>
            {property.data.owners.map((owner: any) => (
              <Col md={3}>
                <p>
                  {owner.firstName} {owner.lastName}
                </p>
                <p>
                  <strong>speaks {owner.languages.join(", ")}</strong>
                </p>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default PropertyPage;
