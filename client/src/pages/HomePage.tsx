import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card } from "react-bootstrap";

import { Link } from "react-router-dom";
import { getProperties } from "../redux/reducers/properties";
import { PropertyType, AppState } from "../types/types";

const HomePage = () => {
  const properties = useSelector((state: AppState) => state.properties);
  const filterBy = useSelector((state: AppState) => state.filterBy);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProperties(filterBy));
  }, [filterBy]);

  return (
    <Container>
      {[0, 3].map((value) => (
        <Row key={value}>
          {properties.data
            .slice(value, value + 3)
            .map((property: PropertyType) => (
              <Col md={4} key={property._id}>
                <Card className="property">
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
                </Card>
              </Col>
            ))}
        </Row>
      ))}
    </Container>
  );
};

export default HomePage;
