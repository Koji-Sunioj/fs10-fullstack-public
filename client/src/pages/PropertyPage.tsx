import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPropery } from "../redux/reducers/property";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import calendarArray from "../utils/calendarArray";
import moment from "moment";
import { createImmutableStateInvariantMiddleware } from "@reduxjs/toolkit";

const PropertyPage = () => {
  let { propertyId } = useParams();
  const dispatch = useDispatch();
  const property = useSelector((state: any) => state.property);
  const [calendar, setCalendar] = useState(calendarArray(new Date()));
  useEffect(() => {
    dispatch(getPropery(propertyId));
  }, [propertyId]);

  const rows = calendar.length / 7;
  const newRows = [];
  for (let i = 0; i < rows; i++) {
    newRows.push(i);
  }
  function checkBooking(date: any, reservations: any) {
    reservations.forEach((val: any) => {
      console.log(val.startDate);
      console.log(date);
      console.log(val.checkOut);
      const start = moment(val.startDate);
      const end = moment(val.checkOut);
      const target = moment(date);
      console.log(start);
      console.log(target);
      console.log(end);
      const isBooked = target.isBetween(start, end);
      console.log(isBooked);
    });
  }

  function dateCompare(date: any) {
    const something = new Date(date);
    if (something < moment(new Date()).startOf("day").toDate()) {
      {
        return date.split("T")[0];
      }
    } else {
      checkBooking(something, property.data.reservations);
      return <Button variant="link">{date.split("T")[0]}</Button>;
    }
  }
  console.log(property.data);
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
          </Row>
          <Row style={{ backgroundColor: "white" }}>
            <Col>
              <Button>Back</Button>
            </Col>
            <Col style={{ backgroundColor: "white" }} md={8}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Thursday</th>
                    <th>Thursday</th>
                  </tr>
                </thead>
                <tbody>
                  {newRows.map((val) => (
                    <tr>
                      {calendar
                        .slice(val * 7, val * 7 + 7)
                        .map((item: string) => {
                          return <td>{dateCompare(item)}</td>;
                        })}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
            <Col>
              <Button
                onClick={() => {
                  console.log(moment().toISOString());
                }}
              >
                Forward
              </Button>
            </Col>
          </Row>
          <Row style={{ backgroundColor: "white" }}>
            <h3>Your host(s)</h3>
            {property.data.owners.map((owner: any) => (
              <Col md={3} key={owner._id}>
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
