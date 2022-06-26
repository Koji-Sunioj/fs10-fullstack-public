import { Row } from "react-bootstrap";

import LoadSpinner from "./LoadSpinner";
import { PropertiesQueryStateType } from "../types/types";

const SearchFeedBack = ({ fetched }: { fetched: PropertiesQueryStateType }) => {
  const { loading, error, count } = fetched;

  return (
    <>
      <Row
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {count !== null && <h3>{count} properties found</h3>}
        {loading && <LoadSpinner />}
        {error && <h3>Error fetching data</h3>}
      </Row>
    </>
  );
};

export default SearchFeedBack;
