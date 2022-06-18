import { useDispatch, useSelector } from "react-redux";
import { Row, Col, InputGroup, FormSelect } from "react-bootstrap";

import { getProperties } from "../redux/reducers/properties";
import PropertyView from "../components/PropertyView";
import PropertyFilter from "../components/PropertyFilter";
import {
  updatePage,
  updateDirection,
  updateSortCategory,
} from "../redux/reducers/filterby";

import mapCategory from "../utils/mapCategory";
import { Form } from "react-bootstrap";
import { AppDispatch } from "../redux/store";
import { AppType } from "../types/types";

const HomePage = () => {
  const properties = useSelector((state: AppType) => state.properties);
  const filterBy = useSelector((state: AppType) => state.filterBy);
  const dispatch = useDispatch<AppDispatch>();
  const pages = [];
  for (let page = Math.ceil(properties.count! / 6); page !== 0; page--) {
    pages.push(page);
  }
  const pointer = { ascending: -1, descending: 1 };

  if (properties.data === null) {
    dispatch(getProperties(filterBy));
  }

  return (
    <>
      <h1>Where do you want to go?</h1>
      <PropertyFilter filter={filterBy.searchBy} />
      <Row>
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
                {pages.reverse().map((page: number) =>
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
                defaultValue={filterBy.direction}
                onChange={(event) => {
                  dispatch(updateDirection(event.target.value));
                }}
              >
                {Object.entries(pointer).map((direction) => (
                  <option value={direction[1]} key={direction[0]}>
                    {direction[0]}
                  </option>
                ))}
              </FormSelect>
              <InputGroup.Text>Sort by:</InputGroup.Text>
              <FormSelect
                defaultValue={filterBy.sortBy}
                onChange={(event) => {
                  dispatch(updateSortCategory(event.target.value));
                }}
              >
                {["nightly rate", "rooms", "category", "location"].map(
                  (category: string) => {
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
        <PropertyView properties={properties.data} />
      )}
      {properties.data && properties.data.length === 0 && (
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
              <h2>Loading</h2>
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
