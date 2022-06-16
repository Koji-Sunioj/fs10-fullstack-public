import { Row, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import moment from "moment";

const PropertyForm = ({ owners, sendProperty, property }: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>("cottage");
  const [price, setPrice] = useState<number | string>("");
  const [rooms, setRooms] = useState<number | string>("");
  const [location, setLocation] = useState("");
  const [buildDate, setBuildDate] = useState("");
  const [theOwners, setTheOwners] = useState<string[]>([]);

  useEffect(() => {
    if (property) {
      setProperty();
    }
  }, [property, setProperty]);

  function setProperty() {
    setTitle(property.title);
    setDescription(property.description);
    setCategory(property.category);
    setPrice(Number(property.nightlyRate));
    setRooms(Number(property.rooms));
    setLocation(property.location);
    setBuildDate(property.buildDate.split("T")[0]);
    setTheOwners(property.owners.map((owner: any) => owner._id));
  }

  const submittable =
    title.length < 5 ||
    description.length < 10 ||
    rooms < 1 ||
    price < 1 ||
    location.length < 1 ||
    !moment(buildDate, "YYYY-MM-DD", true).isValid();

  return (
    <>
      <Row style={{ backgroundColor: "white" }}>
        <Form onSubmit={sendProperty}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="amazing stay"
              name="title"
              defaultValue={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              placeholder="cozy cottage in the middle of nowhere.."
              name="description"
              defaultValue={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select
              name="type"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
              }}
            >
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
              defaultValue={price}
              onChange={(event) => {
                setPrice(Number(event.target.value).toFixed(2));
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Rooms</Form.Label>
            <Form.Control
              type="number"
              min="1"
              name="rooms"
              placeholder="1,2..."
              defaultValue={rooms}
              onChange={(event) => {
                setRooms(Number(event.target.value));
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              placeholder="Kouvula, Parikkala.."
              name="location"
              defaultValue={location}
              onChange={(event) => {
                setLocation(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Build date</Form.Label>
            <Form.Control
              placeholder="yyyy-mm-dd format, e.g. 2020-05-29.."
              name="buildDate"
              defaultValue={buildDate}
              onChange={(event) => {
                setBuildDate(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Owners</Form.Label>
            <Form.Select
              value={theOwners}
              onChange={(event) => {
                setTheOwners(
                  Array.from(event.target)
                    .filter((option: any) => {
                      return option.selected === true;
                    })
                    .map((owner: any) => owner.value)
                );
              }}
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
          <Button variant="primary" type="submit" disabled={submittable}>
            Submit
          </Button>
        </Form>
      </Row>
    </>
  );
};

export default PropertyForm;
