import { Form, Button, FormControl, InputGroup } from "react-bootstrap";

import { updateSearch } from "../redux/reducers/filterby";
import { useDispatch } from "react-redux";

const PropertyFilter = ({ filter }: any) => {
  const dispatch = useDispatch();

  function updateView(event: any) {
    event.preventDefault();
    const searchString = event.currentTarget.search.value;
    dispatch(updateSearch(searchString));
  }

  return (
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
  );
};

export default PropertyFilter;
