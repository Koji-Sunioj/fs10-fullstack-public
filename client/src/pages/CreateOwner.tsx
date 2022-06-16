import { Col, Row, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import OwnerForm from "../components/OwnerForm";
import { getAllProperties } from "../redux/reducers/allproperties";
import { createOwner } from "../redux/reducers/createowner";
import { resetCreateOwner } from "../redux/reducers/createowner";
import { toggleModifiedTrue } from "../redux/reducers/propertyrefresh";
import { AppDispatch } from "../redux/store";
import { OwnerType, AppType } from "../types/types";

const CreateOwner = () => {
  const dispatch = useDispatch<AppDispatch>();
  const client = useSelector((state: AppType) => state.client);
  const properties = useSelector((state: AppType) => state.getAllProperties);
  const addOwner = useSelector((state: AppType) => state.addOwner);
  const token = JSON.parse(localStorage.getItem("token") as string);

  useEffect(() => {
    if (
      client.valid === true &&
      client.data !== null &&
      client.data.isAdmin === true
    ) {
      dispatch(getAllProperties());
    }
    dispatch(resetCreateOwner());
  }, [client]);

  async function sendOwner(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const owner: Omit<OwnerType, "_id"> = {
      languages: form.languages.value.split(","),
      properties: Array.from(form.properties as HTMLSelectElement["options"])
        .filter((option) => {
          return option.selected === true;
        })
        .map((property) => property.value),
      firstName:
        form.firstName.value[0].toUpperCase() +
        form.firstName.value.substring(1).toLowerCase(),
      lastName:
        form.lastName.value[0].toUpperCase() +
        form.lastName.value.substring(1).toLowerCase(),
      biography: form.biography.value,
    };

    await dispatch(createOwner({ token: token, data: owner }));
    dispatch(toggleModifiedTrue());
  }

  const amIAdmin = client.valid && client.data !== null && client.data.isAdmin;

  return (
    <>
      {amIAdmin ? (
        <>
          <select>
            <option></option>
          </select>
          <h1>Create owner</h1>
          <OwnerForm sendOwner={sendOwner} properties={properties} />
          <Row style={{ textAlign: "center" }}>
            {addOwner.success && addOwner.data !== null && (
              <Alert variant="success">
                <Link to={`/owner/${addOwner.data._id}`}>
                  <h3>
                    {addOwner.message}. click here to see their information.
                  </h3>
                </Link>
              </Alert>
            )}
            {addOwner.error && (
              <Alert variant="danger">
                <h3>{addOwner.message}.</h3>
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

export default CreateOwner;
