import moment from "moment";
import { ReservationType } from "../types/types";

const checkBooked = (reservations: Partial<ReservationType>[]) => {
  let booked: string[] = [];
  reservations.forEach((res) => {
    const start = moment(res.startDate);
    const end = moment(res.startDate).add(res.nights, "days");
    const dateDiff = end.diff(start, "days");
    for (let i = 0; i < dateDiff; i++) {
      const startDateClone = start.clone();
      booked.push(startDateClone.add(i, "days").toISOString().split("T")[0]);
    }
  });
  return booked;
};

export default checkBooked;
