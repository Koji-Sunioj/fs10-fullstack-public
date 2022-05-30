import { BrowserRouter, Routes as Router, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const Routes = () => (
  <Router>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
  </Router>
);

export default Routes;
