import { Button, Table } from "react-bootstrap";
import moment from "moment";
import calendarArray from "../utils/calendarArray";

const CalendarView = ({
  decrementFocus,
  incrementFocus,
  focusDay,
  setCheckIn,
  bookedDates,
  disabled,
}: any) => {
  const calendar = calendarArray(focusDay);
  const rows = calendar.length / 7;
  const newRows = [];
  for (let i = 0; i < rows; i++) {
    newRows.push(i);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Button
          onClick={decrementFocus}
          disabled={
            focusDay.clone().subtract(1, "month") < moment().startOf("month")
          }
        >
          Back
        </Button>
        <h3> {focusDay.format("MMMM YYYY")}</h3>
        <Button
          onClick={incrementFocus}
          disabled={
            focusDay.clone().add(1, "month").format("MMMM-YYYY") ===
            moment().startOf("year").add(1, "year").format("MMMM-YYYY")
          }
        >
          Forward
        </Button>
      </div>
      <Table style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Thursday</th>
            <th>Thursday</th>
          </tr>
        </thead>
        <tbody>
          {newRows.map((val: number) => (
            <tr key={val}>
              {calendar.slice(val * 7, val * 7 + 7).map((item: any) => {
                if (
                  item.format("M") !== focusDay.format("M") ||
                  item < moment().startOf("day")
                ) {
                  return (
                    <td style={{ backgroundColor: "lightgrey" }} key={item}>
                      {item.format("DD")}
                    </td>
                  );
                } else {
                  if (bookedDates.includes(item.format("YYYY-MM-DD"))) {
                    return (
                      <td
                        style={{ backgroundColor: "#f8d7da" }}
                        key={item}
                        title={"booked"}
                      >
                        {item.format("DD")}
                      </td>
                    );
                  } else {
                    return (
                      <td key={item}>
                        <Button
                          variant="link"
                          style={{
                            textDecoration: "none",
                            padding: "0px",
                          }}
                          disabled={disabled}
                          onClick={() => {
                            setCheckIn(String(item.format("YYYY-MM-DD")));
                          }}
                        >
                          {item.format("DD")}
                        </Button>
                      </td>
                    );
                  }
                }
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default CalendarView;
