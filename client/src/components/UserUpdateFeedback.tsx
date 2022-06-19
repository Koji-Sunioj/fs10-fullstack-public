import { useDispatch } from "react-redux";
import { Row, Alert } from "react-bootstrap";
import { resetUpdateUser } from "../redux/reducers/updateuser";

import { UpdateType } from "../types/types";

const UserUpdateFeedback = ({ patchUser }: { patchUser: UpdateType }) => {
  const dispatch = useDispatch();
  const shouldFeedback = patchUser.success || patchUser.error;

  return (
    <>
      {shouldFeedback && (
        <Row style={{ padding: "0px", textAlign: "center" }}>
          <Alert
            variant={patchUser.success ? "success" : "danger"}
            onClose={() => dispatch(resetUpdateUser())}
            dismissible
          >
            <h3>{patchUser.message}</h3>
          </Alert>
        </Row>
      )}
    </>
  );
};

export default UserUpdateFeedback;
