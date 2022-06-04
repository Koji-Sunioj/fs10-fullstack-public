import { useSelector } from "react-redux";

const CalendarView = () => {
  const property = useSelector(
    (state: any) => state.property.data.reservations
  );
  return <p>aaad</p>;
};

export default CalendarView;
