import { useParams } from "react-router-dom";
import { AppState } from "../types/types";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPropery } from "../redux/reducers/property";
import { Container, Row, Card } from "react-bootstrap";

const PropertyPage = () => {
  let { propertyId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPropery(propertyId));
  }, []);

  const property = useSelector((state: any) => state.property);
  const shouldFetch = property.data != null && property.data._id === propertyId;

  return (
    <Container>
      <Row>
        {shouldFetch && (
          <Card>
            <div>
              <h1>{property.data.title}</h1>
              <p>{property.data.description}</p>
            </div>
          </Card>
        )}
      </Row>
    </Container>
  );
};

export default PropertyPage;
