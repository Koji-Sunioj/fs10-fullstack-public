import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import { PropertyType } from "../types/types";

const PropertyGrid = ({ properties }: { properties: PropertyType[] }) => {
  return (
    <div id="property-grid">
      {[0, 3].map((value) => (
        <Row key={value}>
          {properties!.slice(value, value + 3).map((property) => (
            <Col md={4} key={property._id}>
              <div className="property">
                <Link to={`property/${property._id}`}>
                  <h3>
                    {property.title} in {property.location}
                  </h3>
                </Link>
                <p>{property.description}</p>
                <p>
                  <strong>Price: {property.nightlyRate.toFixed(2)} </strong>
                </p>
                <p>
                  <strong>Rooms: {property.rooms} </strong>
                </p>
                <p>
                  <strong>Type: {property.category} </strong>
                </p>
              </div>
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
};

export default PropertyGrid;
