import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPropery } from "../redux/reducers/property";
import {
  Button,
  Row,
  Container,
  InputGroup,
  FormControl,
  Col,
  Form,
  Alert,
} from "react-bootstrap";
import checkBooked from "../utils/checkBooked";
import moment from "moment";
import { createReservation } from "../redux/reducers/createres";
import { resetRes } from "../redux/reducers/createres";
import { deleteReservation, resetDel } from "../redux/reducers/deleteres";
import CalendarView from "../components/CalendarView";
import { reservationView } from "../redux/reducers/resesrvationview";

const PropertyPage = () => {
  let { propertyId } = useParams();
  const token = JSON.parse(localStorage.getItem("token") as string);
  const dispatch = useDispatch();
  const property = useSelector((state: any) => state.property);
  const deleteRes = useSelector((state: any) => state.deleteRes);
  const client = useSelector((state: any) => state.client);
  const createRes = useSelector((state: any) => state.createRes);
  const viewRes = useSelector((state: any) => state.reservationView);
  const [focusDay, setFocusDate] = useState(moment().startOf("month"));
  const [checkIn, setCheckIn] = useState("");
  const [nights, setNumNights] = useState(0);

  console.log(viewRes);

  const bookedDates = viewRes.data === null ? [] : checkBooked(viewRes.data);

  console.log(bookedDates);

  useEffect(() => {
    dispatch(getPropery(propertyId));
    dispatch(resetRes());
    dispatch(resetDel());
    dispatch(reservationView(propertyId));
  }, [propertyId]);

  function decrementFocus() {
    const date = focusDay.clone();
    setFocusDate(date.subtract(1, "month"));
  }

  function incrementFocus() {
    const date = focusDay.clone();
    setFocusDate(date.add(1, "month"));
  }

  console.log(localStorage.getItem("token") as string);

  async function update(event: any, id: any) {
    event.preventDefault();
    const formData = {
      startDate: checkIn,
      nights: nights,
      propertyId: id,
    };
    setCheckIn("");
    await dispatch(createReservation({ token: token.token, data: formData }));
    dispatch(reservationView(propertyId));
    dispatch(resetDel());
  }

  let requestedNights: string[] = [];
  if (moment(checkIn, "YYYY-MM-DD", true).isValid()) {
    const dateDiff = moment(checkIn)
      .add(nights, "days")
      .diff(moment(checkIn), "days");
    for (let i = 0; i < dateDiff; i++) {
      const day = moment(checkIn).clone();
      requestedNights.push(
        day.add(i, "days").format("YYYY-MM-DD").split("T")[0]
      );
    }
  }

  async function test(reservationId: any) {
    await dispatch(
      deleteReservation({ token: token.token, reservationId: reservationId })
    );
    dispatch(resetRes());
    dispatch(reservationView(propertyId));
  }

  return (
    <Container>
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

          <Row style={{ backgroundColor: "white" }}>
            <CalendarView
              bookedDates={bookedDates}
              decrementFocus={decrementFocus}
              incrementFocus={incrementFocus}
              setCheckIn={setCheckIn}
              focusDay={focusDay}
            />
          </Row>
          <Row>
            <Form
              style={{ padding: "0px" }}
              onSubmit={(e) => {
                update(e, property.data._id);
              }}
            >
              <InputGroup style={{ padding: "0px" }}>
                <InputGroup.Text>Check In</InputGroup.Text>
                <FormControl
                  defaultValue={checkIn}
                  onChange={(event) => {
                    setCheckIn(String(event.target.value));
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
                    nights > 7 ||
                    requestedNights.some((r: any) => bookedDates.includes(r))
                  }
                  type="submit"
                >
                  Go
                </Button>
              </InputGroup>
            </Form>
          </Row>
          <>
            {client.valid !== null &&
              viewRes.data !== null &&
              viewRes.data.map((reservation: any) => {
                if (reservation.userId === client.data._id) {
                  return (
                    <Row
                      style={{ backgroundColor: "white" }}
                      key={reservation._id}
                    >
                      <Col>
                        <h3>id: {reservation._id}</h3>
                        <p>check in: {reservation.startDate.split("T")[0]}</p>
                        <p>
                          check out:{" "}
                          {moment(reservation.startDate)
                            .add(reservation.nights, "days")
                            .format("YYYY-MM-DD")}
                        </p>
                        <p>nights: {reservation.nights}</p>
                        <Button
                          variant={"danger"}
                          disabled={moment(reservation.startDate) < moment()}
                          onClick={() => {
                            test(reservation._id);
                          }}
                        >
                          delete
                        </Button>
                      </Col>
                    </Row>
                  );
                }
              })}
          </>

          <Row style={{ textAlign: "center" }}>
            {createRes.success && (
              <Alert variant="success">
                <h3>{createRes.message}</h3>
              </Alert>
            )}
            {createRes.error && (
              <Alert variant="danger">
                <h3>{createRes.message}</h3>
              </Alert>
            )}
            {deleteRes.success && (
              <Alert variant="success">
                <h3>{deleteRes.message}</h3>
              </Alert>
            )}
            {deleteRes.error && (
              <Alert variant="danger">
                <h3>{deleteRes.message}</h3>
              </Alert>
            )}
          </Row>
        </>
      )}
    </Container>
  );
};

export default PropertyPage;
