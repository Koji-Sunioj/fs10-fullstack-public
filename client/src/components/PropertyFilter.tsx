import { useDispatch } from "react-redux";
import { updateSearch } from "../redux/reducers/filterby";
import { Form, Button, FormControl, InputGroup, Row } from "react-bootstrap";

const PropertyFilter = ({ filter }: { filter: string }) => {
  const dispatch = useDispatch();

  const updateView = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchString = event.currentTarget.search.value;
    dispatch(updateSearch(searchString));
  };

  return (
    <Row>
      <Form className="d-flex" onSubmit={updateView}>
        <InputGroup>
          <FormControl
            type="search"
            placeholder="property type, location, title..."
            name="search"
            defaultValue={filter}
          />
          <Button type="submit">Go</Button>
        </InputGroup>
      </Form>
    </Row>
  );
};

export default PropertyFilter;
