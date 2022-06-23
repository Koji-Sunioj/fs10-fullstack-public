import { Row, Alert } from "react-bootstrap";

import { UpdateType } from "../types/types";

const CrudPageFeedBack = ({
  status,
}: {
  status: UpdateType & { purged?: boolean };
}) => {
  const purgedOrUpdate = status.success || status.purged;
  return (
    <Row style={{ textAlign: "center", padding: "0px" }}>
      {purgedOrUpdate && (
        <Alert variant="success">
          <h3>{status.message}.</h3>
        </Alert>
      )}
      {status.error && (
        <Alert variant="danger">
          <h3>{status.message}.</h3>
        </Alert>
      )}
    </Row>
  );
};

export default CrudPageFeedBack;
