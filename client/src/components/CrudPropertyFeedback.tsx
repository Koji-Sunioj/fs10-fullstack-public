import { Link } from "react-router-dom";
import { Row, Alert } from "react-bootstrap";
import { CreatePropertyType } from "../types/types";

const CrudPropertyFeedback = ({ status }: { status: CreatePropertyType }) => {
  const shouldFeedback = status.success || status.error;
  return (
    <>
      {shouldFeedback && (
        <Row style={{ textAlign: "center", padding: "0px" }}>
          <Alert variant={status.success ? "success" : "danger"}>
            {status.success ? (
              <Link to={`/property/${status.data!._id}`}>
                <h3>{status.message}. click here to see the listing.</h3>
              </Link>
            ) : (
              <h3>{status.message}.</h3>
            )}
          </Alert>
        </Row>
      )}{" "}
    </>
  );
};

export default CrudPropertyFeedback;
