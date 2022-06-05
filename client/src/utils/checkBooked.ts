import moment from "moment";

function checkBooked(reservations: any) {
  let booked: any = [];
  reservations.forEach((res: any) => {
    console.log(res.nights);
    const start = moment(res.startDate);
    const end = moment(res.startDate).add(res.nights, "days");
    console.log(start);
    console.log(end);
    const dateDiff = end.diff(start, "days");
    for (let i = 0; i < dateDiff; i++) {
      const something = start.clone();
      booked.push(something.add(i, "days").toISOString().split("T")[0]);
    }
  });
  return booked;
}

export default checkBooked;
