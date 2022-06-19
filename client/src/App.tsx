import "./App.css";
import Routes from "./Routes";
import { Container } from "react-bootstrap/";

import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Container>
        <Routes />
      </Container>
    </>
  );
}

export default App;
