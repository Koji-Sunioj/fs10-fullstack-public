import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPropery } from "../redux/reducers/property";
import {
  Button,
  Table,
  Row,
  Container,
  InputGroup,
  FormControl,
  Col,
} from "react-bootstrap";
import calendarArray from "../utils/calendarArray";
import checkBooked from "../utils/checkBooked";
import moment from "moment";

const PropertyPage = () => {
  let { propertyId } = useParams();
  const dispatch = useDispatch();
  const property = useSelector((state: any) => state.property);
  const [focusDay, setFocusDate] = useState(moment().startOf("month"));
  const [checkIn, setCheckIn] = useState("");
  const [nights, setNumNights] = useState(0);
  const calendar = calendarArray(focusDay);

  const rows = calendar.length / 7;
  const newRows = [];
  for (let i = 0; i < rows; i++) {
    newRows.push(i);
  }
  const bookedDates =
    property.data === null ? [] : checkBooked(property.data.reservations);

  useEffect(() => {
    dispatch(getPropery(propertyId));
  }, [propertyId]);

  function decrementFocus() {
    const date = focusDay.clone();
    setFocusDate(date.subtract(1, "month"));
  }

  function incrementFocus() {
    const date = focusDay.clone();
    setFocusDate(date.add(1, "month"));
  }

  console.log(checkIn);
  console.log(moment(checkIn).add(nights, "days").toDate());

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
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Button
                onClick={decrementFocus}
                disabled={
                  focusDay.clone().subtract(1, "month") <
                  moment().startOf("month")
                }
              >
                Back
              </Button>
              <h3> {focusDay.format("MMMM YYYY")}</h3>
              <Button onClick={incrementFocus}>Forward</Button>
            </div>
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
                  <tr key={val}>
                    {calendar.slice(val * 7, val * 7 + 7).map((item) => {
                      if (
                        item.format("M") !== focusDay.format("M") ||
                        item < moment()
                      ) {
                        return (
                          <td
                            style={{ backgroundColor: "lightgrey" }}
                            key={item}
                          >
                            {item.format("DD")}
                          </td>
                        );
                      } else {
                        if (bookedDates.includes(item.format("YYYY-MM-DD"))) {
                          return (
                            <td style={{ backgroundColor: "red" }} key={item}>
                              {item.format("DD")}
                            </td>
                          );
                        } else {
                          return (
                            <td key={item}>
                              <Button
                                variant="link"
                                style={{
                                  textDecoration: "none",
                                  padding: "0px",
                                }}
                                onClick={() => {
                                  setCheckIn(item.format("YYYY-MM-DD"));
                                }}
                              >
                                {item.format("DD")}
                              </Button>
                            </td>
                          );
                        }
                      }
                    })}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
          <Row>
            <InputGroup style={{ padding: "0px" }}>
              <InputGroup.Text>Check In</InputGroup.Text>
              <FormControl
                defaultValue={checkIn}
                onChange={(event) => {
                  setCheckIn(event.target.value);
                }}
              />
              <InputGroup.Text>Nights</InputGroup.Text>
              <FormControl
                type="number"
                max="7"
                min="0"
                onChange={(event) => {
                  setNumNights(Number(event.target.value));
                }}
              />
              <Button
                disabled={
                  !/^\d{4}-\d{2}-\d{2}$/g.test(checkIn) ||
                  nights < 1 ||
                  nights > 7
                }
              >
                Go
              </Button>
            </InputGroup>
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
