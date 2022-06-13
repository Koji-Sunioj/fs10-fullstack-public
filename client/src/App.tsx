import "./App.css";
import Routes from "./Routes";
import NavBar from "./components/NavBar";
import { Container } from "react-bootstrap/";

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
