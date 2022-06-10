import {
  Col,
  Container,
  Row,
  Form,
  Button,
  FormControl,
  InputGroup,
  Alert,
} from "react-bootstrap";

import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { resetClient } from "../redux/reducers/client";
import { resetAuth } from "../redux/reducers/verifygoogle";
import { resetFilter } from "../redux/reducers/filterby";
import { updateUser } from "../redux/reducers/updateuser";
import { verifyToken } from "../redux/reducers/client";
import { getMyReservations } from "../redux/reducers/myreservations";

const AdminPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updatesomething = useSelector((state: any) => state.updateUser);
  const reservations = useSelector((state: any) => state.myReservations);
  const client = useSelector((state: any) => state.client);
  const [isToggleForm, setToggleForm] = useState(false);
  const token = JSON.parse(localStorage.getItem("token") as string);

  useEffect(() => {
    if (client.valid) {
      dispatch(getMyReservations(client.data._id));
    }
  }, [client]);

  function logout() {
    localStorage.removeItem("token");
    dispatch(resetClient());
    dispatch(resetAuth());
    dispatch(resetFilter());
    navigate("/");
  }

  async function test(event: any, userId: any) {
    event.preventDefault();
    console.log(userId);
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    await dispatch(
      updateUser({
        token: token,
        userId: userId,
        data: { firstName: firstName, lastName: lastName },
      })
    );
    dispatch(verifyToken(token));
  }

  return (
    <Container>
      {client.valid && client.data.isAdmin ? (
        <>
          <Row>
            <h2 style={{ textAlign: "center" }}>
              Welcome {client.data.firstName} {client.data.lastName}
            </h2>
          </Row>
          <Row style={{ backgroundColor: "white" }}>
            <Col>
              <p>email address: {client.data.email}</p>
              <p>joined: {client.data.joinDate.split("T")[0]}</p>
              <p>role: {client.data.isAdmin ? "administrator" : "user"}</p>
              <Button variant={"danger"} onClick={logout}>
                Log Out
              </Button>
            </Col>
          </Row>
          <Row>
            <h2 style={{ textAlign: "center" }}>Update your details</h2>
          </Row>
          <Row>
            <Form
              style={{ padding: "0px" }}
              onSubmit={(e) => {
                test(e, client.data._id);
              }}
            >
              <InputGroup style={{ padding: "0px" }}>
                <InputGroup.Checkbox
                  checked={isToggleForm}
                  onChange={(event: any) => {
                    setToggleForm(event.target.checked);
                  }}
                />

                <InputGroup.Text>first name:</InputGroup.Text>
                <FormControl
                  disabled={!isToggleForm}
                  defaultValue={client.data.firstName}
                  name="firstName"
                />
                <InputGroup.Text>last name: </InputGroup.Text>
                <FormControl
                  disabled={!isToggleForm}
                  defaultValue={client.data.lastName}
                  name="lastName"
                />
                <Button disabled={!isToggleForm} type="submit">
                  Go
                </Button>
              </InputGroup>
            </Form>
          </Row>
          {updatesomething.success && (
            <Row style={{ textAlign: "center" }}>
              <Alert variant="success">{updatesomething.message}</Alert>
            </Row>
          )}
          <Row>
            <h2 style={{ textAlign: "center" }}>Actions</h2>
          </Row>
          <Row style={{ backgroundColor: "white" }}>
            <Col>
              <Link to={"/admin/create-property"}>
                <Button variant="primary">Create a property</Button>
              </Link>
              <Button variant="primary">Create a owner</Button>
            </Col>
          </Row>
          {reservations.data !== null && reservations.data.length > 0 && (
            <>
              <Row>
                <Col style={{ textAlign: "center" }}>
                  <h2>Your reservations</h2>
                </Col>
              </Row>
              {reservations.data.map((reservation: any) => (
                <Row style={{ backgroundColor: "white" }} key={reservation.property._id}>
                  <Link to={`/property/${reservation.property._id}`}>
                    <h3>
                      {reservation.property.title} in{" "}
                      {reservation.property.location}
                    </h3>
                  </Link>
                  <p>check in: {reservation.startDate.split("T")[0]}</p>
                  <p>check out: {reservation.checkOut.split("T")[0]}</p>
                  <p>nights: {reservation.nights}</p>
                  <p>total: &euro;{reservation.bill.toFixed(2)}</p>
                </Row>
              ))}
            </>
          )}
        </>
      ) : (
        <Row style={{ textAlign: "center" }}>
          <Col>
            <h2>no authorization for this view</h2>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default AdminPage;
