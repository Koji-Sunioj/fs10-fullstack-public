import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getOwners } from "../redux/reducers/getowners";
import { useEffect,useState } from "react";
import { createProperty } from "../redux/reducers/createproperty";
import { Link } from "react-router-dom";
import { resetCreateProp } from "../redux/reducers/createproperty";

const CreateProperty = () => {
  const dispatch = useDispatch();
  const client = useSelector((state: any) => state.client);
  const owners = useSelector((state: any) => state.owners);
  const token = JSON.parse(localStorage.getItem("token") as string);
  const addProperty = useSelector((state: any) => state.createProp);

  /*const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [price,setPrice] = useState(0)
  const [rooms,setRooms] = useState(0)
  const [title,setTitle] = useState("")
  const [title,setTitle] = useState("")*/

  useEffect(() => {
    if (client.valid === true && client.data.isAdmin === true) {
      dispatch(getOwners());
      dispatch(resetCreateProp());
    }
  }, [client]);

  function sendProperty(event: any) {
    event.preventDefault();
    const form = event.target;
    const property = {
      location: form.location.value,
      title: form.title.value,
      description: form.description.value,
      nightlyRate: Number(form.nightlyRate.value),
      rooms: Number(form.rooms.value),
      owners: Array.from(form.owners)
        .filter((option: any) => {
          return option.selected === true;
        })
        .map((owner: any) => owner.value),
      category: form.type.value,
      buildDate: form.buildDate.value,
    };
    dispatch(createProperty({ token: token, data: property }));
  }

  function smth()
  {
    console.log('asdasd')
  }

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
            <Form onSubmit={sendProperty}>
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
                <Form.Label>Price per night (&euro;)</Form.Label>
                <Form.Control
                  type="decimal"
                  min="1"
                  name="nightlyRate"
                  placeholder="10,30.80..."
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Rooms</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  name="rooms"
                  placeholder="1,2..."
                />
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
              <Form.Group className="mb-3">
                <Form.Label>Owners</Form.Label>
                <Form.Select
                  name="owners"
                  multiple
                  disabled={owners.loading || owners.error}
                >
                  {owners.data !== null &&
                    owners.data.map((owner: any) => (
                      <option value={owner._id} key={owner._id}>
                        {owner.firstName} {owner.lastName}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Row>
          <Row style={{ textAlign: "center" }}>
            {addProperty.success && (
              <Alert variant="success">
                <Link to={`/property/${addProperty.data._id}`}>
                  <h3>{addProperty.message}. click here to see the listing.</h3>
                </Link>
              </Alert>
            )}
            {addProperty.error && (
              <Alert variant="danger">
                <h3>{addProperty.message}.</h3>
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

export default CreateProperty;
