import {
  Col,
  Container,
  Row,
  Form,
  Button,
  FormControl,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getOwners } from "../redux/reducers/getowners";
import { useEffect } from "react";

const CreateProperty = () => {
  const dispatch = useDispatch();
  const client = useSelector((state: any) => state.client);
  const owners = useSelector((state: any) => state.owners);

  useEffect(() => {
    dispatch(getOwners());
  }, []);

  console.log(owners)

  return (
    <Container>
      {client.valid && client.data.isAdmin ? (
        <>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <h1>Create property</h1>
            </Col>
          </Row>
          <Row style={{ backgroundColor: "white" }}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control placeholder="amazing stay" name="title" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  placeholder="cozy cottage in the middle of nowhere.."
                  name="description"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Select name="type">
                  <option value="cottage">Cottage</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="hut">Hut</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price per night</Form.Label>
                <Form.Control type="number" min="1" name="nightlyRate" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Rooms</Form.Label>
                <Form.Control type="number" min="1" name="rooms" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  placeholder="Kouvula, Parikkala.."
                  name="location"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Build date</Form.Label>
                <Form.Control
                  placeholder="yyyy-mm-dd format, e.g. 2020-05-29.."
                  name="buildDate"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
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

export default CreateProperty;
