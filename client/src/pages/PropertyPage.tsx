import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Stack,
} from "react-bootstrap";
import checkBooked from "../utils/checkBooked";
import moment from "moment";
import { createReservation } from "../redux/reducers/createres";
import { resetRes } from "../redux/reducers/createres";
import { deleteReservation, resetDel } from "../redux/reducers/deleteres";
import CalendarView from "../components/CalendarView";
import { reservationView } from "../redux/reducers/resesrvationview";
import { deleteProperty } from "../redux/reducers/deleteproperty";
import { Link } from "react-router-dom";
import { resetUpdateProp } from "../redux/reducers/updateproperty";
import { crudRefresh } from "../redux/reducers/filterby";

const PropertyPage = () => {
  let { propertyId } = useParams();
  const token = JSON.parse(localStorage.getItem("token") as string);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const property = useSelector((state: any) => state.property);
  const deleteRes = useSelector((state: any) => state.deleteRes);
  const client = useSelector((state: any) => state.client);
  const createRes = useSelector((state: any) => state.createRes);
  const removeProp = useSelector((state: any) => state.deleteProp);
  const updateProp = useSelector((state: any) => state.updateProp);
  const viewRes = useSelector((state: any) => state.reservationView);
  const [focusDay, setFocusDate] = useState(moment().startOf("month"));
  const [checkIn, setCheckIn] = useState<string>("");
  const [nights, setNumNights] = useState<string | number>("");

  console.log(property);

  const bookedDates = viewRes.data === null ? [] : checkBooked(viewRes.data);

  useEffect(() => {
    if (
      property.data === null ||
      (property.data !== null && property.data._id !== propertyId) ||
      updateProp.success
    ) {
      dispatch(getPropery(propertyId));
    }
    dispatch(reservationView(propertyId));
    dispatch(resetRes());
    dispatch(resetDel());
    dispatch(resetUpdateProp());
  }, [propertyId, updateProp]);

  function decrementFocus() {
    const date = focusDay.clone();
    setFocusDate(date.subtract(1, "month"));
  }

  function incrementFocus() {
    const date = focusDay.clone();
    setFocusDate(date.add(1, "month"));
  }
  async function update(event: any, id: any) {
    event.preventDefault();
    setCheckIn("");
    setNumNights("");
    const formData = {
      startDate: checkIn,
      nights: nights,
      propertyId: id,
    };
    await dispatch(createReservation({ token: token, data: formData }));
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

  async function removeReservation(reservationId: any) {
    await dispatch(
      deleteReservation({ token: token, reservationId: reservationId })
    );
    dispatch(resetRes());
    dispatch(reservationView(propertyId));
  }

  const shouldRenderRows =
    client.valid === true &&
    viewRes.data !== null &&
    viewRes.data.some((r: any) => r.userId === client.data._id);

  async function adminDelete(propertyId: any) {
    await dispatch(deleteProperty({ token: token, propertyId: propertyId }));
    dispatch(crudRefresh());
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }

  console.log(removeProp);

  return (
    <Container>
      {property.data && property.data._id === propertyId && (
        <>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <h2>Property Overview</h2>
            </Col>
          </Row>
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
              {client.data !== null && client.data.isAdmin && (
                <Stack direction="horizontal" gap={3}>
                  <Button
                    variant="danger"
                    onClick={() => adminDelete(property.data._id)}
                  >
                    Delete property
                  </Button>
                  <Link to={`/admin/edit-property/${propertyId}`}>
                    <Button variant="primary">Edit property</Button>
                  </Link>
                </Stack>
              )}
            </Col>
          </Row>
          <Row style={{ backgroundColor: "white" }}>
            <h3>Your host(s)</h3>
            <Stack direction="horizontal" gap={3}>
              {property.data.owners.map((owner: any) => (
                <div key={owner._id}>
                  <Link to={`/owner/${owner._id}`}>
                    <p>
                      {owner.firstName} {owner.lastName}
                    </p>
                  </Link>
                  <p>
                    <strong>speaks {owner.languages.join(", ")}</strong>
                  </p>
                </div>
              ))}
            </Stack>
          </Row>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <h2>Book your holiday</h2>
            </Col>
          </Row>
          <Row style={{ backgroundColor: "white" }}>
            <CalendarView
              bookedDates={bookedDates}
              decrementFocus={decrementFocus}
              incrementFocus={incrementFocus}
              setCheckIn={setCheckIn}
              focusDay={focusDay}
              disabled={client.valid === false || client.valid === null}
            />
          </Row>
          <Row>
            {" "}
            <Col></Col>
            <Form
              style={{ padding: "0px" }}
              onSubmit={(e) => {
                update(e, property.data._id);
              }}
            >
              <fieldset
                disabled={client.valid === false || client.valid === null}
              >
                <InputGroup style={{ padding: "0px" }}>
                  <InputGroup.Text>Check In</InputGroup.Text>
                  <FormControl
                    value={checkIn}
                    onChange={(event) => {
                      setCheckIn(String(event.target.value));
                    }}
                  />
                  <InputGroup.Text>Nights</InputGroup.Text>
                  <FormControl
                    type="number"
                    max="7"
                    min="0"
                    value={nights}
                    onChange={(event) => {
                      const night = Number(event.target.value);
                      night === 0
                        ? setNumNights("")
                        : setNumNights(Number(night));
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
              </fieldset>
            </Form>
          </Row>

          {shouldRenderRows && (
            <>
              <Row>
                <Col style={{ textAlign: "center" }}>
                  <h2>Your reservations</h2>
                </Col>
              </Row>
              {viewRes.data.map((reservation: any) => {
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
                        <p>
                          total: &euro;
                          {reservation.nights.toFixed(2) *
                            Number(property.data.nightlyRate)}
                        </p>
                        <Button
                          variant={"danger"}
                          disabled={
                            moment(reservation.startDate).startOf("day") <
                            moment().startOf("day")
                          }
                          onClick={() => {
                            removeReservation(reservation._id);
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
          )}

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

            {removeProp.success && (
              <Alert variant="success">
                <h3>{removeProp.message}</h3>
              </Alert>
            )}
            {removeProp.error && (
              <Alert variant="danger">
                <h3>{removeProp.message}</h3>
              </Alert>
            )}
          </Row>
        </>
      )}
    </Container>
  );
};

export default PropertyPage;
