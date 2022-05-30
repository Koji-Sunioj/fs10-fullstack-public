import { Form, Button, FormControl, InputGroup } from "react-bootstrap";

const PropertyFilter = () => {
  return (
    <Form className="d-flex">
      <InputGroup>
        <FormControl
          type="search"
          placeholder="property type, location, title..."
        />
        <Button>Go</Button>
      </InputGroup>
    </Form>
  );
};

export default PropertyFilter;
