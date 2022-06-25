import moment from "moment";
import { Row, Col, Button } from "react-bootstrap";

import { ReservationViewType } from "../types/types";

const ReservationView = ({
  reservations,
  userId,
  property,
  pullReservation,
}: ReservationViewType) => {
  return (
    <>
      {reservations.data!.map((reservation) => {
        return (
          reservation.userId === userId && (
            <Row style={{ backgroundColor: "white" }} key={reservation._id}>
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
                    pullReservation(reservation._id!);
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
  );
};

export default ReservationView;
