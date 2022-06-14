import { useDispatch, useSelector } from "react-redux";
import { Row, Col, InputGroup, FormSelect } from "react-bootstrap";

import { AppState, FilterType, PropertyState } from "../types/types";
import { getProperties } from "../redux/reducers/properties";
import PropertyView from "../components/PropertyView";
import PropertyFilter from "../components/PropertyFilter";
import {
  updatePage,
  updateDirection,
  updateSortCategory,
} from "../redux/reducers/filterby";

import { initialState } from "../redux/reducers/properties";
import mapCategory from "../utils/mapCategory";
import { Form } from "react-bootstrap";

const HomePage = () => {
  const properties: PropertyState = useSelector(
    (state: AppState) => state.properties
  );
  const filterBy: FilterType = useSelector((state: AppState) => state.filterBy);
  const dispatch = useDispatch();

  const pages = [];
  for (let page = Math.ceil(properties.count! / 6); page !== 0; page--) {
    pages.push(page);
  }
  const pointer = { ascending: -1, descending: 1 };

  if (initialState === properties) {
    dispatch(getProperties(filterBy));
  }

  return (
    <>
      <h1>Where do you want to go?</h1>
      <PropertyFilter filter={filterBy.searchBy} />
      <Row>
        {" "}
        <Form>
          <fieldset disabled={properties.data?.length === 0}>
            <InputGroup>
              <InputGroup.Text>Page:</InputGroup.Text>
              <FormSelect
                onChange={(event) => {
                  dispatch(updatePage(event.target.value));
                }}
                value={String(filterBy.page)}
              >
                {pages.reverse().map((page: any) =>
                  Number(page) === filterBy.page ? (
                    <option key={page}>{page}</option>
                  ) : (
                    <option value={page} key={page}>
                      {page}
                    </option>
                  )
                )}
              </FormSelect>
              <InputGroup.Text>Direction:</InputGroup.Text>
              <FormSelect
                onChange={(event) => {
                  dispatch(updateDirection(event.target.value));
                }}
              >
                {Object.entries(pointer).map((direction: any[]) => (
                  <option value={direction[1]} key={direction[0]}>
                    {direction[0]}
                  </option>
                ))}
              </FormSelect>
              <InputGroup.Text>Sort by:</InputGroup.Text>
              <FormSelect
                onChange={(event) => {
                  dispatch(updateSortCategory(event.target.value));
                }}
              >
                {["nightly rate", "rooms", "category", "location"].map(
                  (category: any) => {
                    const optValue = mapCategory(category);
                    return (
                      <option value={optValue} key={category}>
                        {category}
                      </option>
                    );
                  }
                )}
              </FormSelect>
            </InputGroup>
          </fieldset>
        </Form>
      </Row>
      {properties.data && properties.data.length > 0 && (
        <PropertyView properties={properties} filter={filterBy} />
      )}
      {properties.data && properties.data.length == 0 && (
        <Row>
          <Col style={{ textAlign: "center" }}>
            <div className="property">
              <h3>No results found!</h3>
            </div>
          </Col>
        </Row>
      )}
      {properties.loading && (
        <Row>
          <Col style={{ textAlign: "center" }}>
            <div className="property">
              <h3>Loading</h3>
            </div>
          </Col>
        </Row>
      )}
      {properties.error && (
        <Row>
          <Col style={{ textAlign: "center" }}>
            <div className="property">
              <h3>Error fetching data</h3>{" "}
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default HomePage;
