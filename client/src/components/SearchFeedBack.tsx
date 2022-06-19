import { Row, Col } from "react-bootstrap";

import { FetchPropertiesQueryType } from "../types/types";

const SearchFeedBack = ({ fetched }: { fetched: FetchPropertiesQueryType }) => {
  const shouldRender =
    (fetched.data && fetched.data!.length === 0) ||
    fetched.loading ||
    fetched.error;
  return (
    <>
      <Row>
        <Col style={{ textAlign: "center" }}>
          {shouldRender && (
            <div className="property">
              {!fetched.error && fetched.data?.length === 0 && (
                <h3>No results found!</h3>
              )}
              {fetched.loading && <h3>Loading</h3>}
              {fetched.error && <h3>Error fetching data</h3>}
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default SearchFeedBack;
