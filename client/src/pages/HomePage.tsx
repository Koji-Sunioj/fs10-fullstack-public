import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, InputGroup, FormSelect } from "react-bootstrap";

import { AppState } from "../types/types";
import { getProperties } from "../redux/reducers/properties";
import PropertyView from "../components/PropertyView";
import PropertyFilter from "../components/PropertyFilter";
import { updatePage, updateDirection } from "../redux/reducers/filterby";

const HomePage = () => {
  const properties = useSelector((state: AppState) => state.properties);
  const filterBy = useSelector((state: AppState) => state.filterBy);
  const dispatch = useDispatch();

  console.log(filterBy);
  const pages = [];
  for (let page = Math.ceil(properties.count! / 6); page !== 0; page--) {
    pages.push(page);
  }
  const pointer: any = { ascending: -1, descending: 1 };

  useEffect(() => {
    dispatch(getProperties(filterBy));
  }, [filterBy]);

  function test(event: any) {
    dispatch(updatePage(event.target.value));
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Where do you want to go?</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <PropertyFilter filter={filterBy.searchBy} />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputGroup>
            <InputGroup.Text>Page:</InputGroup.Text>
            <FormSelect
              defaultValue={String(filterBy.page)}
              onChange={(event) => {
                dispatch(updatePage(event.target.value));
              }}
            >
              {pages.reverse().map((page) => (
                <option value={page} key={page}>
                  {page}
                </option>
              ))}
            </FormSelect>
            <InputGroup.Text>Direction:</InputGroup.Text>
            <FormSelect
              onChange={(event) => {
                dispatch(updateDirection(event.target.value));
              }}
            >
              {Object.entries(pointer).map((direction: any[]) => {
                return (
                  <option value={direction[1]} key={direction[0]}>
                    {direction[0]}
                  </option>
                );
              })}
            </FormSelect>
            <InputGroup.Text>Sort by:</InputGroup.Text>
            <FormSelect>
              {["nightRate", "rooms", "category", "location"].map(
                (category: any) => {
                  return (
                    <option value={category} key={category}>
                      {category}
                    </option>
                  );
                }
              )}
            </FormSelect>
          </InputGroup>
        </Col>
      </Row>
      {properties.data.length > 0 && (
        <PropertyView properties={properties} filter={filterBy} />
      )}
      {properties.loading && (
        <Row>
          <Col className="property" style={{ textAlign: "center" }}>
            <h3>Loading</h3>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default HomePage;
