import { Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

import { PropertyStateType } from "../types/types";

const OwnerView = ({ property }: { property: PropertyStateType }) => {
  const { owners } = property.data!;

  return (
    <Row style={{ backgroundColor: "white" }}>
      <h3>Your host(s)</h3>
      <Stack direction="horizontal" gap={3}>
        {owners.map((owner) => (
          <div key={owner._id}>
            <Link to={`/owner/${owner._id}`}>
              <p>
                {owner.firstName} {owner.lastName}
              </p>
            </Link>
            <p>
              <strong>speaks: {owner.languages.join(", ")}</strong>
            </p>
          </div>
        ))}
      </Stack>
    </Row>
  );
};

export default OwnerView;
