import { Link } from "react-router-dom";
import { Row, Alert } from "react-bootstrap";
import { PropertyStateType, CreateOwnerType } from "../types/types";

const AdminActionFeedback = ({
  status,
  uri,
}: {
  status: PropertyStateType | CreateOwnerType;
  uri: string;
}) => {
  const shouldFeedback = status.success || status.error;
  return (
    <>
      {shouldFeedback && (
        <Row style={{ textAlign: "center", padding: "0px" }}>
          <Alert variant={status.success ? "success" : "danger"}>
            {status.success ? (
              <Link to={`/${uri}/${status.data!._id}`}>
                <h3>{status.message}. click here to see the update.</h3>
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

export default AdminActionFeedback;

/*const AdminActionFeedback = ({
  status,
  uri,
}: {
  status: CreatePropertyType | CreateOwnerType;
  uri: string;
}) => {
  const shouldFeedback = status.success || status.error;
  return (
    <>
      {shouldFeedback && (
        <Row style={{ textAlign: "center", padding: "0px" }}>
          <Alert variant={status.success ? "success" : "danger"}>
            {status.success ? (
              <Link to={`/${uri}/${status.data!._id}`}>
                <h3>{status.message}. click here to see the update.</h3>
              </Link>
            ) : (
              <h3>{status.message}.</h3>
            )}
          </Alert>
        </Row>
      )}{" "}
    </>
  );
};*/
