import moment from "moment";

function checkBooked(reservations: any) {
  let booked: any = [];

  reservations.forEach((res: any) => {
    const start = moment(res.startDate);
    const end = moment(res.checkOut);
    const dateDiff = end.diff(start, "days");
    for (let i = 0; i < dateDiff; i++) {
      const something = start.clone();
      booked.push(something.add(i, "days").toISOString().split("T")[0]);
    }
  });
  console.log(booked);
  return booked;
}

export default checkBooked;
