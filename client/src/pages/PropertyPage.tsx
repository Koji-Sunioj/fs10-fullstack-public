import { AppType } from "../types/types";
import { useEffect, useState } from "react";
import { AppDispatch } from "../redux/store";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { modifiedOwnerTrue } from "../redux/reducers/ownerrefresh";
import { propertyReservations } from "../redux/reducers/resesrvationview";
import { modifiedPropertyFalse } from "../redux/reducers/propertyrefresh";
import { Button, Row, InputGroup, FormControl, Form } from "react-bootstrap";
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
import OwnerView from "../components/OwnerView";
import { ReservationType } from "../types/types";
import CalendarView from "../components/CalendarView";
import ReservationView from "../components/ReservationView";
import PropertyOverView from "../components/PropertyOverView";
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

  const appendReservation = (
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

  const pullReservation = (reservationId: string) => {
    dispatch(
      removeReservation({
        token: token,
        reservationId: reservationId,
      })
    );
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
          <PropertyOverView
            amIAdmin={amIAdmin!}
            property={property}
            adminDelete={adminDelete}
          />
          {property.data.owners.length > 0 && <OwnerView property={property} />}
          <h2>Book your holiday</h2>
          <Row style={{ backgroundColor: "white" }}>
            <CalendarView
              bookedDates={bookedDates}
              decrementFocus={decrementCalendar}
              incrementFocus={incrementCalendar}
              setCheckIn={setCheckIn}
              focusDay={focusDay}
              disabled={!client.valid}
            />
            <Form
              style={{ padding: "0px" }}
              onSubmit={(e) => {
                appendReservation(e, propertyId);
              }}
            >
              <fieldset disabled={!client.valid}>
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
              <ReservationView
                reservations={reservationView}
                userId={client.data!._id}
                property={property}
                pullReservation={pullReservation}
              />
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
