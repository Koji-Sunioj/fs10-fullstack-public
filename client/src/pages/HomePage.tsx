import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProperties } from "../redux/reducers/properties";

const HomePage = () => {
  const currentInfo = useSelector((state: any) => state.properties);
  const dispatch = useDispatch();
  console.log(currentInfo);
  if (currentInfo.data.length === 0) {
    dispatch(getProperties());
  }

  return <Container>test</Container>;
};

export default HomePage;
