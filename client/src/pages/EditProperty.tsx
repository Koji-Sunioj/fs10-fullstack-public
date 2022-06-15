import { Col, Row, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProperty } from "../redux/reducers/property";
import { getOwners } from "../redux/reducers/getowners";
import { updateProperty } from "../redux/reducers/updateproperty";
import { resetUpdateProp } from "../redux/reducers/updateproperty";
import { Link } from "react-router-dom";
import { crudRefresh } from "../redux/reducers/filterby";
import PropertyForm from "../components/PropertyForm";
import { toggleModifiedTrue } from "../redux/reducers/propertyrefresh";

//import { useAppDispatch } from "../redux/store";

const EditProperty = () => {
  const dispatch = useDispatch();

  const { propertyId } = useParams();
  const client = useSelector((state: any) => state.client);
  const patchProperty = useSelector((state: any) => state.updateProperty);
  const owners = useSelector((state: any) => state.owners);
  const property = useSelector((state: any) => state.property);
  const token = JSON.parse(localStorage.getItem("token") as string);

  useEffect(() => {
    if (client.valid === true && client.data.isAdmin === true) {
      dispatch(getOwners());
      dispatch(getProperty(propertyId));
      dispatch(resetUpdateProp());
    }
  }, [client]);

  async function sendProperty(event: any) {
    event.preventDefault();
    const form = event.target;
    const property = {
      location: form.location.value,
      title: form.title.value,
      description: form.description.value,
      nightlyRate: Number(form.nightlyRate.value).toFixed(2),
      rooms: Number(form.rooms.value),
      owners: Array.from(form.owners)
        .filter((option: any) => {
          return option.selected === true;
        })
        .map((owner: any) => owner.value),
      category: form.type.value,
      buildDate: form.buildDate.value,
    };
    await dispatch(
      updateProperty({ token: token, data: property, propertyId: propertyId })
    );
    dispatch(toggleModifiedTrue());
    dispatch(crudRefresh());
  }

  return (
    <>
      {client.valid && client.data.isAdmin ? (
        <>
          <h1>Edit property</h1>

          <PropertyForm
            sendProperty={sendProperty}
            owners={owners}
            property={property.data}
          />
          <Row style={{ textAlign: "center" }}>
            {patchProperty.success && (
              <Alert variant="success">
                <Link to={`/property/${propertyId}`}>
                  <h3>
                    {patchProperty.message}. click here to see the listing.
                  </h3>
                </Link>
              </Alert>
            )}
            {patchProperty.error && (
              <Alert variant="danger">
                <h3>{patchProperty.message}.</h3>
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

export default EditProperty;
