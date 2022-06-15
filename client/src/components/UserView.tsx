import {
  Row,
  Alert,
  Button,
  Col,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../redux/reducers/filterby";
import { updateUser } from "../redux/reducers/updateuser";
import { resetAuth } from "../redux/reducers/verifygoogle";
import { resetUpdateUser } from "../redux/reducers/updateuser";
import { verifyToken, resetClient } from "../redux/reducers/client";

const UserView = ({ client, children }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isToggleForm, setToggleForm] = useState(false);
  const token = JSON.parse(localStorage.getItem("token") as string);
  const updateName = useSelector((state: any) => state.updateUser);
  const reservations = useSelector((state: any) => state.myReservations);

  useEffect(() => {
    dispatch(resetUpdateUser());
  }, []);

  function logout() {
    localStorage.removeItem("token");
    dispatch(resetClient());
    dispatch(resetAuth());
    dispatch(resetFilter());
    navigate("/");
  }

  async function editUser(event: any, userId: any) {
    event.preventDefault();
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
    <>
      <h2>
        Welcome {client.firstName} {client.lastName}
      </h2>
      <Row style={{ backgroundColor: "white" }}>
        <Col>
          <p>email address: {client.email}</p>
          <p>joined: {client.joinDate.split("T")[0]}</p>
          <p>role: {client.isAdmin ? "administrator" : "user"}</p>
          <Button variant={"danger"} onClick={logout}>
            Log Out
          </Button>
        </Col>
      </Row>
      {children}
      <h2>Update your details</h2>
      <Row style={{ backgroundColor: "white" }}>
        <Form
          style={{ padding: "0px" }}
          onSubmit={(e) => {
            editUser(e, client._id);
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
              defaultValue={client.firstName}
              name="firstName"
            />
            <InputGroup.Text>last name: </InputGroup.Text>
            <FormControl
              disabled={!isToggleForm}
              defaultValue={client.lastName}
              name="lastName"
            />
            <Button disabled={!isToggleForm} type="submit">
              Go
            </Button>
          </InputGroup>
        </Form>
      </Row>
      {updateName.success && (
        <Row style={{ textAlign: "center" }}>
          <Alert variant="success">{updateName.message}</Alert>
        </Row>
      )}
      {reservations.data !== null && reservations.data.length > 0 && (
        <>
          <h2>Your reservations</h2>
          {reservations.data.map((reservation: any) => (
            <Row style={{ backgroundColor: "white" }} key={reservation._id}>
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
  );
};

export default UserView;
