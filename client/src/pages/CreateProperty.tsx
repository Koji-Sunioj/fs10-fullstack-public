import { Col, Row, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getOwners } from "../redux/reducers/getowners";
import { useEffect } from "react";
import { createProperty } from "../redux/reducers/createproperty";
import { Link } from "react-router-dom";
import { resetCreateProp } from "../redux/reducers/createproperty";
import { crudRefresh } from "../redux/reducers/filterby";
import { AppDispatch } from "../redux/store";
import PropertyForm from "../components/PropertyForm";
import { PropertyType } from "../types/types";

const CreateProperty = () => {
  const dispatch = useDispatch<AppDispatch>();
  const client = useSelector((state: any) => state.client);
  const owners = useSelector((state: any) => state.owners);
  const token = JSON.parse(localStorage.getItem("token") as string);
  const addProperty = useSelector((state: any) => state.createProperty);

  useEffect(() => {
    if (client.valid === true && client.data.isAdmin === true) {
      dispatch(getOwners());
    }
    dispatch(resetCreateProp());
  }, [client]);

  async function sendProperty(event: any) {
    event.preventDefault();
    const form = event.target;
    const property: PropertyType = {
      location: form.location.value,
      title: form.title.value,
      description: form.description.value,
      nightlyRate: Number(form.nightlyRate.value.toFixed(2)),
      rooms: Number(form.rooms.value),
      owners: Array.from(form.owners)
        .filter((option: any) => {
          return option.selected === true;
        })
        .map((owner: any) => owner.value),
      category: form.type.value,
      buildDate: form.buildDate.value,
    };
    await dispatch(createProperty({ token: token, data: property }));
    dispatch(crudRefresh());
  }

  return (
    <>
      {client.valid && client.data.isAdmin ? (
        <>
          <h1>Create property</h1>
          <PropertyForm sendProperty={sendProperty} owners={owners} />
          <Row style={{ textAlign: "center" }}>
            {addProperty.success && (
              <Alert variant="success">
                <Link to={`/property/${addProperty.data._id}`}>
                  <h3>{addProperty.message}. click here to see the listing.</h3>
                </Link>
              </Alert>
            )}
            {addProperty.error && (
              <Alert variant="danger">
                <h3>{addProperty.message}.</h3>
              </Alert>
            )}
          </Row>
        </>
      ) : (
        <Row style={{ textAlign: "center" }}>
          <Col>
            <h2>no authorization for this view</h2>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CreateProperty;
