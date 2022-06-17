import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProperty } from "../redux/reducers/property";
import { ReservationType } from "../types/types";
import {
  Button,
  Row,
  InputGroup,
  FormControl,
  Col,
  Form,
  Alert,
  Stack,
} from "react-bootstrap";
import checkBooked from "../utils/checkBooked";
import moment from "moment";
import {
  createReservation,
  resetCreateReservation,
} from "../redux/reducers/createreservation";
import {
  deleteReservation,
  resetDeleteReservation,
} from "../redux/reducers/deletereservation";
import CalendarView from "../components/CalendarView";
import { resetDeleteProperty } from "../redux/reducers/deleteproperty";
import { reservationView } from "../redux/reducers/resesrvationview";
import { deleteProperty } from "../redux/reducers/deleteproperty";
import { Link } from "react-router-dom";
import { crudRefresh } from "../redux/reducers/filterby";
import { AppDispatch } from "../redux/store";
import { AppType } from "../types/types";
import { toggleModifiedFalse } from "../redux/reducers/propertyrefresh";

const PropertyPage = () => {
  let { propertyId } = useParams<string>();
  const token = JSON.parse(localStorage.getItem("token") as string);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const property = useSelector((state: AppType) => state.property);

  const client = useSelector((state: AppType) => state.client);
  const pushReservation = useSelector(
    (state: AppType) => state.createReservation
  );
  const pullReservation = useSelector(
    (state: AppType) => state.deleteReservation
  );
  const pullProperty = useSelector((state: AppType) => state.deleteProperty);
  const viewRes = useSelector((state: AppType) => state.reservationView);
  const [focusDay, setFocusDate] = useState<moment.Moment>(
    moment().startOf("month")
  );
  const [checkIn, setCheckIn] = useState<string>("");
  const [nights, setNumNights] = useState<string | number>("");

  const bookedDates = viewRes.data === null ? [] : checkBooked(viewRes.data);

  useEffect(() => {
    if (
      (property.data !== undefined && property.data === null) ||
      (property.data !== null && property.data._id !== propertyId)
    ) {
      dispatch(getProperty(propertyId!));
    }
    window.scrollTo(0, 0);
    dispatch(resetDeleteReservation());
    dispatch(resetCreateReservation());
    dispatch(toggleModifiedFalse());
    dispatch(resetDeleteProperty());
    dispatch(reservationView(propertyId!));
  }, [propertyId, dispatch, property.data]);

  function decrementFocus() {
    const date = focusDay.clone();
    setFocusDate(date.subtract(1, "month"));
  }

  function incrementFocus() {
    const date = focusDay.clone();
    setFocusDate(date.add(1, "month"));
  }
  async function update(event: React.FormEvent<HTMLFormElement>, id: string) {
    event.preventDefault();
    dispatch(resetDeleteReservation());
    setCheckIn("");
    setNumNights("");
    const formData: ReservationType = {
      startDate: checkIn,
      nights: Number(nights),
      propertyId: id,
    };
    await dispatch(createReservation({ token: token, data: formData }));
    dispatch(reservationView(propertyId!));
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

  async function removeReservation(reservationId: string) {
    dispatch(resetCreateReservation());
    await dispatch(
      deleteReservation({ token: token, reservationId: reservationId })
    );
    dispatch(reservationView(propertyId!));
  }

  const shouldRenderRows =
    client.valid === true &&
    viewRes.data !== null &&
    viewRes.data.some((r) => r.userId === client.data!._id);

  async function adminDelete(propertyId: string) {
    await dispatch(deleteProperty({ token: token, propertyId: propertyId }));
    dispatch(crudRefresh());
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }

  return (
    <>
      {property.loading && <h2>loading...</h2>}
      {property.data && property.data._id === propertyId && (
        <>
          <h2>Property Overview</h2>
          <Row style={{ backgroundColor: "white" }}>
            <Col md={6}>
              <h3>{property.data.title}</h3>
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
                  built:
                  {new Date(property.data.buildDate).getUTCFullYear()}
                </strong>
              </p>
              {client.data !== null && client.data.isAdmin && (
                <Stack direction="horizontal" gap={3}>
                  <Button
                    variant="danger"
                    onClick={() => adminDelete(property.data!._id)}
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
          {property.data.owners.length > 0 && (
            <>
              <Row style={{ backgroundColor: "white" }}>
                <h3>Your host(s)</h3>
                <Stack direction="horizontal" gap={3}>
                  {property.data.owners.map((owner) => (
                    <div key={owner._id}>
                      <Link to={`/owner/${owner._id}`}>
                        <p>
                          {owner.firstName} {owner.lastName}
                        </p>
                      </Link>
                      <p>
                        <strong>speaks: {owner.languages.join(", ")}</strong>
                      </p>
                    </div>
                  ))}
                </Stack>
              </Row>
            </>
          )}
          <h2>Book your holiday</h2>
          <Row style={{ backgroundColor: "white" }}>
            <CalendarView
              bookedDates={bookedDates}
              decrementFocus={decrementFocus}
              incrementFocus={incrementFocus}
              setCheckIn={setCheckIn}
              focusDay={focusDay}
              disabled={client.valid === false || client.valid === null}
            />
            <Form
              style={{ padding: "0px" }}
              onSubmit={(e) => {
                update(e, property.data!._id);
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
                      requestedNights.some((r) => bookedDates.includes(r))
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
              <h2>Your reservations</h2>
              {viewRes.data!.map((reservation) => {
                return (
                  reservation.userId === client.data!._id && (
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
                          {(
                            Number(reservation.nights) *
                            Number(property.data!.nightlyRate)
                          ).toFixed(2)}
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
                  )
                );
              })}
            </>
          )}

          <Row style={{ textAlign: "center" }}>
            {pushReservation.success && (
              <Alert variant="success">
                <h3>{pushReservation.message}</h3>
              </Alert>
            )}
            {pushReservation.error && (
              <Alert variant="danger">
                <h3>{pushReservation.message}</h3>
              </Alert>
            )}
            {pullReservation.success && (
              <Alert variant="success">
                <h3>{pullReservation.message}</h3>
              </Alert>
            )}
            {pullReservation.error && (
              <Alert variant="danger">
                <h3>{pullReservation.message}</h3>
              </Alert>
            )}

            {pullProperty.success && (
              <Alert variant="success">
                <h3>{pullProperty.message}</h3>
              </Alert>
            )}
            {pullProperty.error && (
              <Alert variant="danger">
                <h3>{pullProperty.message}</h3>
              </Alert>
            )}
          </Row>
        </>
      )}
    </>
  );
};

export default PropertyPage;
