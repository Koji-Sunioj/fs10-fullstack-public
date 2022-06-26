import moment from "moment";
import { Row, Form, Button } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";

import mapOptions from "../utils/mapOptions";
import { PropertyType, PropertyFormType } from "../types/types";

const PropertyForm = ({
  allOwners,
  sendProperty,
  property,
  submitted,
}: PropertyFormType) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [buildDate, setBuildDate] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [rooms, setRooms] = useState<number | string>("");
  const [theOwners, setTheOwners] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("cottage");

  const setProperty = useCallback(() => {
    const {
      title,
      description,
      category,
      nightlyRate,
      rooms,
      location,
      buildDate,
      owners,
    } = property!;

    setTitle(title);
    setDescription(description);
    setCategory(category);
    setPrice(Number(nightlyRate));
    setRooms(Number(rooms));
    setLocation(location);
    setBuildDate(buildDate.split("T")[0]);
    setTheOwners(owners.map((owner) => owner._id));
  }, [property]);

  useEffect(() => {
    if (property) {
      setProperty();
    }
  }, [property, setProperty]);

  const parsePropertyForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      propertyTitle,
      description,
      category,
      nightlyRate,
      rooms,
      location,
      buildDate,
      owners,
    } = event.currentTarget;
    const property: Omit<PropertyType, "_id"> = {
      location: location.value,
      title: propertyTitle.value,
      description: description.value,
      nightlyRate: Number(nightlyRate.value),
      rooms: Number(rooms.value),
      owners: Array.from(owners as HTMLSelectElement["options"])
        .filter((option) => {
          return option.selected === true;
        })
        .map((owner) => owner.value),
      category: category.value,
      buildDate: buildDate.value,
    };
    sendProperty(property);
  };

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
        <Form onSubmit={parsePropertyForm}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="amazing stay"
              name="propertyTitle"
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
              name="category"
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
                mapOptions(event.currentTarget, setTheOwners);
              }}
              name="owners"
              multiple
              disabled={allOwners.loading || allOwners.error}
            >
              {allOwners.data &&
                allOwners.data.map((owner) => (
                  <option value={owner._id} key={owner._id}>
                    {owner.firstName} {owner.lastName}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={submittable || submitted}
          >
            Submit
          </Button>
        </Form>
      </Row>
    </>
  );
};

export default PropertyForm;
