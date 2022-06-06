import {
  Col,
  Container,
  Row,
  Form,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getMyReservations } from "../redux/reducers/myreservations";
import moment from "moment";

import { Link } from "react-router-dom";

const MyAccount = () => {
  const dispatch = useDispatch();
  const client = useSelector((state: any) => state.client);
  const reservations = useSelector((state: any) => state.myReservations);
  const [isToggleForm, setToggleForm] = useState(false);

  useEffect(() => {
    if (client.valid) {
      dispatch(getMyReservations(client.data._id));
    }
  }, [client]);

  console.log(client);

  return (
    <Container>
      {client.valid ? (
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
            </Col>
          </Row>
          <Row>
            <h2 style={{ textAlign: "center" }}>update your details</h2>
          </Row>
          <Row>
            <Form style={{ padding: "0px" }}>
              <InputGroup style={{ padding: "0px" }}>
                <InputGroup.Checkbox
                  checked={isToggleForm}
                  aria-label="Checkbox for following text input"
                  onChange={(event: any) => {
                    setToggleForm(event.target.checked);
                  }}
                />

                <InputGroup.Text>first name:</InputGroup.Text>
                <FormControl
                  disabled={!isToggleForm}
                  defaultValue={client.data.firstName}
                />
                <InputGroup.Text>last name: </InputGroup.Text>
                <FormControl
                  disabled={!isToggleForm}
                  defaultValue={client.data.lastName}
                />
                <Button>Go</Button>
              </InputGroup>
            </Form>
          </Row>
          {reservations.data !== null && reservations.data.length > 0 && (
            <>
              <Row>
                <Col style={{ textAlign: "center" }}>
                  <h2>Your reservations</h2>
                </Col>
              </Row>
              {reservations.data.map((reservation: any) => (
                <Row style={{ backgroundColor: "white" }}>
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
        <p>no</p>
      )}
    </Container>
  );
};

export default MyAccount;
