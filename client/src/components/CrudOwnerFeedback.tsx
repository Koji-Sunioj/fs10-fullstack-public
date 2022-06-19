import { Link } from "react-router-dom";
import { Row, Alert } from "react-bootstrap";
import { CreateOwnerType } from "../types/types";

const CrudOwnerFeedBack = ({ status }: { status: CreateOwnerType }) => {
  const shouldFeedback = status.success || status.error;
  return (
    <>
      {shouldFeedback && (
        <Row style={{ textAlign: "center", padding: "0px" }}>
          <Alert variant={status.success ? "success" : "danger"}>
            {status.success ? (
              <Link to={`/owner/${status.data!._id}`}>
                <h3>{status.message}. click here to see the update.</h3>
              </Link>
            ) : (
              <h3>{status.message}.</h3>
            )}
          </Alert>
        </Row>
      )}
    </>
  );
};

export default CrudOwnerFeedBack;
