import React from "react";
import { Container, Form, Button, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { append, selectForm } from "./redux/reducers/formData";

function App() {
  const dipatch = useDispatch();

  const currentInfo = useSelector(selectForm);
  console.log(currentInfo);

  function test(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newData: string = event.currentTarget.data.value;
    dipatch(append(newData));
  }

  return (
    <div className="App">
      <Container>
        <h1>Testing</h1>
        <Form
          onSubmit={(event) => {
            test(event);
          }}
        >
          <Form.Group className="mb-3">
            <Form.Control placeholder="Enter stuff" name="data" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        <Row>{currentInfo.value}</Row>
      </Container>
    </div>
  );
}

export default App;
