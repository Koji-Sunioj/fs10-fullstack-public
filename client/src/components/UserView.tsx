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
import { resetFilter } from "../redux/reducers/filterby";
import { resetAuth } from "../redux/reducers/verifygoogle";
import { getMyReservations } from "../redux/reducers/myreservations";
import { resetCreateReservation } from "../redux/reducers/createreservation";
import { resetDeleteReservation } from "../redux/reducers/deletereservation";
import { resetClient, resetPatch, patchUser } from "../redux/reducers/client";

import UserUpdateFeedback from "./UserUpdateFeedback";
import { AppType, UserViewType } from "../types/types";

const UserView = ({ client, children }: UserViewType) => {
  const navigate = useNavigate();
  const { deleteReservation, createReservation, myReservations } = useSelector(
    (state: AppType) => state
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isToggleForm, setToggleForm] = useState(false);
  const token = JSON.parse(localStorage.getItem("token") as string);

  const onLeave = () => {
    dispatch(resetPatch());
  };

  useEffect(() => {
    if (
      client.valid ||
      createReservation.success ||
      deleteReservation.success
    ) {
      !myReservations.data && dispatch(getMyReservations(client.data!._id));
      dispatch(resetCreateReservation());
      dispatch(resetDeleteReservation());
    }

    window.addEventListener("beforeunload", onLeave);
    return () => {
      onLeave();
      window.removeEventListener("beforeunload", onLeave);
    };
  }, [
    client.valid,
    dispatch,
    createReservation.success,
    myReservations.data,
    deleteReservation.success,
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
      patchUser({
        token: token,
        userId: userId,
        data: { firstName: firstName, lastName: lastName },
      })
    );
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
            <Button disabled={!isToggleForm || client.success} type="submit">
              Go
            </Button>
          </InputGroup>
        </Form>
      </Row>
      <UserUpdateFeedback patchUser={client} />
      {myReservations.data && myReservations.data.length > 0 && (
        <>
          <h2>Your reservations</h2>
          {myReservations.data.map((reservation) => (
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
