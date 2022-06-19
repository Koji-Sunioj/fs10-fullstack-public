import {
  Row,
  Button,
  Col,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { AppDispatch } from "../redux/store";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetClient } from "../redux/reducers/client";
import { AppType, UserViewType } from "../types/types";
import { setFromUpdate } from "../redux/reducers/client";
import { resetFilter } from "../redux/reducers/filterby";
import { updateUser } from "../redux/reducers/updateuser";
import { resetAuth } from "../redux/reducers/verifygoogle";
import { resetUpdateUser } from "../redux/reducers/updateuser";
import { getMyReservations } from "../redux/reducers/myreservations";
import { resetCreateReservation } from "../redux/reducers/createreservation";
import { resetDeleteReservation } from "../redux/reducers/deletereservation";

import UserUpdateFeedback from "./UserUpdateFeedback";

const UserView = ({ client, children }: UserViewType) => {
  const navigate = useNavigate();
  const pushReservation = useSelector(
    (state: AppType) => state.createReservation
  );
  const pullReservation = useSelector(
    (state: AppType) => state.deleteReservation
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isToggleForm, setToggleForm] = useState(false);
  const token = JSON.parse(localStorage.getItem("token") as string);
  const updateName = useSelector((state: AppType) => state.updateUser);
  const reservations = useSelector((state: AppType) => state.myReservations);

  useEffect(() => {
    if (
      (client.valid && !reservations.data) ||
      pushReservation.success ||
      pullReservation.success
    ) {
      dispatch(getMyReservations(client.data!._id));
      dispatch(resetCreateReservation());
      dispatch(resetDeleteReservation());
    }
    dispatch(resetUpdateUser());
  }, [
    client,
    dispatch,
    reservations.data,
    pushReservation.success,
    pullReservation.success,
  ]);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(resetClient());
    dispatch(resetAuth());
    dispatch(resetFilter());
    navigate("/");
  };

  const editUser = (
    event: React.FormEvent<HTMLFormElement>,
    userId: string
  ) => {
    event.preventDefault();
    const firstName = event.currentTarget.firstName.value;
    const lastName = event.currentTarget.lastName.value;
    dispatch(
      updateUser({
        token: token,
        userId: userId,
        data: { firstName: firstName, lastName: lastName },
      })
    );
    dispatch(setFromUpdate({ firstName, lastName }));
  };

  return (
    <>
      <h2>
        Welcome {client.data!.firstName} {client.data!.lastName}
      </h2>
      <Row style={{ backgroundColor: "white" }}>
        <Col>
          <p>email address: {client.data!.email}</p>
          <p>joined: {client.data!.joinDate.split("T")[0]}</p>
          <p>role: {client.data!.isAdmin ? "administrator" : "user"}</p>
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
            editUser(e, client.data!._id);
          }}
        >
          <InputGroup style={{ padding: "0px" }}>
            <InputGroup.Checkbox
              checked={isToggleForm}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setToggleForm(event.target.checked);
              }}
            />

            <InputGroup.Text>first name:</InputGroup.Text>
            <FormControl
              disabled={!isToggleForm}
              defaultValue={client.data!.firstName}
              name="firstName"
            />
            <InputGroup.Text>last name: </InputGroup.Text>
            <FormControl
              disabled={!isToggleForm}
              defaultValue={client.data!.lastName}
              name="lastName"
            />
            <Button
              disabled={!isToggleForm || updateName.success}
              type="submit"
            >
              Go
            </Button>
          </InputGroup>
        </Form>
      </Row>
      <UserUpdateFeedback patchUser={updateName} />
      {reservations.data && reservations.data.length > 0 && (
        <>
          <h2>Your reservations</h2>
          {reservations.data.map((reservation) => (
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
