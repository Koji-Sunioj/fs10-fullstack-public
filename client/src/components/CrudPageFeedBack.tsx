import { Link } from "react-router-dom";
import { Row, Alert } from "react-bootstrap";
import { UpdateType } from "../types/types";

const CrudPageFeedBack = ({ status }: { status: UpdateType }) => {
  const shouldFeedback = status.success || status.error;
  return (
    <>
      {shouldFeedback && (
        <Row style={{ textAlign: "center", padding: "0px" }}>
          <Alert variant={status.success ? "success" : "danger"}>
            <h3>{status.message}.</h3>
          </Alert>
        </Row>
      )}
    </>
  );
};

export default CrudPageFeedBack;
