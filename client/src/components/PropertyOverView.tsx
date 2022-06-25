import { Link } from "react-router-dom";
import { Row, Col, Stack, Button } from "react-bootstrap";

import { PropertyOverViewType } from "../types/types";

const PropertyOverView = ({
  amIAdmin,
  property,
  adminDelete,
}: PropertyOverViewType) => {
  const { title, description, category, buildDate, _id, rooms, location } =
    property.data!;

  return (
    <Row style={{ backgroundColor: "white" }}>
      <Col md={6}>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>
          <strong>type: {category}</strong>
        </p>
        <p>
          <strong>
            price per night: &euro;
            {property.data!.nightlyRate.toFixed(2)}
          </strong>
        </p>
        <p>
          <strong>rooms: {rooms}</strong>
        </p>
        <p>
          <strong>location: {location}</strong>
        </p>
        <p>
          <strong>
            built:
            {new Date(buildDate).getUTCFullYear()}
          </strong>
        </p>
        {amIAdmin && (
          <Stack direction="horizontal" gap={3}>
            <Button variant="danger" onClick={() => adminDelete(_id)}>
              Delete property
            </Button>
            <Link to={`/admin/edit-property/${_id}`}>
              <Button variant="primary">Edit property</Button>
            </Link>
          </Stack>
        )}
      </Col>
    </Row>
  );
};

export default PropertyOverView;
