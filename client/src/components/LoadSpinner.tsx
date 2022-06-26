import { Spinner } from "react-bootstrap";

const LoadSpinner = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Spinner
        animation="grow"
        variant="light"
        style={{ height: "200px", width: "200px" }}
      />
    </div>
  );
};

export default LoadSpinner;
