import moment from "moment";

function calendarArray(date: any) {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const firstWeek = moment()
    .day("Monday")
    .year(firstDay.getFullYear())
    .isoWeek(moment(firstDay).isoWeek());

  console.log(firstWeek.toDate());

  const lastWeek = moment()
    .day("Sunday")
    .year(lastDay.getFullYear())
    .isoWeek(moment(lastDay).isoWeek());

  const dateDiff = lastWeek.diff(firstWeek, "days");
  console.log(dateDiff);
  const calendar: any = [];

  for (let i = 0; i <= dateDiff; i++) {
    const something = firstWeek.clone();
    calendar.push(
      something.add(i, "days").startOf("day").format("YYYY-MM-DD") +
        "T00:00:00.000Z"
    );
  }

  return calendar;
}

export default calendarArray;
