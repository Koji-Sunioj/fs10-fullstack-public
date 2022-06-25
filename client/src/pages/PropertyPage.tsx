import { AppType } from "../types/types";
import { useEffect, useState } from "react";
import { AppDispatch } from "../redux/store";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { modifiedOwnerTrue } from "../redux/reducers/ownerrefresh";
import { propertyReservations } from "../redux/reducers/resesrvationview";
import { modifiedPropertyFalse } from "../redux/reducers/propertyrefresh";
import {
  Button,
  Row,
  InputGroup,
  FormControl,
  Col,
  Form,
  Stack,
} from "react-bootstrap";
import moment from "moment";
import {
  addReservation,
  removeReservation,
} from "../redux/reducers/resesrvationview";

import {
  getProperty,
  deleteProperty,
  flushProperty,
  resetPropertyEdit,
} from "../redux/reducers/property";

import checkBooked from "../utils/checkBooked";
import { ReservationType } from "../types/types";
import CalendarView from "../components/CalendarView";
import CrudPageFeedBack from "../components/CrudPageFeedBack";

const PropertyPage = () => {
  const navigate = useNavigate();
  const { propertyId } = useParams<string>();
  const dispatch = useDispatch<AppDispatch>();
  const [checkIn, setCheckIn] = useState<string>("");
  const [nights, setNumNights] = useState<string | number>("");
  const [focusDay, setFocusDate] = useState<moment.Moment>(
    moment().startOf("month")
  );
  const { client, property, reservationView } = useSelector(
    (state: AppType) => state
  );
  const token = JSON.parse(localStorage.getItem("token") as string);
  const amIAdmin = client.valid && client.data!.isAdmin;
  const freshPropertyOrNull =
    !property.data || (property.data && property.data._id !== propertyId);

  useEffect(() => {
    if (freshPropertyOrNull) {
      dispatch(getProperty(propertyId!));
    } else if (property.purged) {
      setTimeout(() => {
        navigate("/");
        dispatch(flushProperty());
      }, 1500);
    } else {
      window.scrollTo(0, 0);
      dispatch(resetPropertyEdit());
      dispatch(modifiedPropertyFalse());
      dispatch(propertyReservations(propertyId!));
    }
  }, [propertyId, freshPropertyOrNull, dispatch, navigate, property.purged]);

  const decrementCalendar = () => {
    const date = focusDay.clone();
    setFocusDate(date.subtract(1, "month"));
  };

  const incrementCalendar = () => {
    const date = focusDay.clone();
    setFocusDate(date.add(1, "month"));
  };

  const appendReservation = async (
    event: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    event.preventDefault();
    setCheckIn("");
    setNumNights("");
    const formData: Partial<ReservationType> = {
      startDate: checkIn,
      nights: Number(nights),
      propertyId: id,
    };
    dispatch(addReservation({ token: token, data: formData }));
  };

  const adminDelete = async (propertyId: string) => {
    await dispatch(deleteProperty({ token: token, propertyId: propertyId }));
    dispatch(modifiedOwnerTrue({ from: "property" }));
  };

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

  const bookedDates = !reservationView.data
    ? []
    : checkBooked(reservationView.data);

  const shouldRenderReservations =
    client.valid &&
    reservationView.data &&
    reservationView.data.some(
      (reservation) => reservation.userId === client.data!._id
    );

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
              {amIAdmin && (
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
              decrementFocus={decrementCalendar}
              incrementFocus={incrementCalendar}
              setCheckIn={setCheckIn}
              focusDay={focusDay}
              disabled={client.valid === false || client.valid === null}
            />
            <Form
              style={{ padding: "0px" }}
              onSubmit={(e) => {
                appendReservation(e, property.data!._id);
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
                      requestedNights.some((night) =>
                        bookedDates.includes(night)
                      )
                    }
                    type="submit"
                  >
                    Go
                  </Button>
                </InputGroup>
              </fieldset>
            </Form>
          </Row>
          {shouldRenderReservations && (
            <>
              <h2>Your reservations</h2>
              {reservationView.data!.map((reservation) => {
                return (
                  reservation.userId === client.data!._id && (
                    <Row
                      style={{ backgroundColor: "white" }}
                      key={reservation._id}
                    >
                      <Col>
                        <h3>id: {reservation._id}</h3>
                        <p>check in: {reservation.startDate!.split("T")[0]}</p>
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
                            dispatch(
                              removeReservation({
                                token: token,
                                reservationId: reservation._id!,
                              })
                            );
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
          <CrudPageFeedBack status={property} />
          <CrudPageFeedBack status={reservationView} />
        </>
      )}
    </>
  );
};

export default PropertyPage;
