import { useParams, Routes as Router, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MyAccount from "./pages/MyAccount";
import SignUp from "./pages/SignUp";
import PropertyPage from "./pages/PropertyPage";

const Routes = () => (
  <Router>
    <Route path="/" element={<HomePage />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/myaccount" element={<MyAccount />} />
    <Route path="/property/:propertyId" element={<PropertyPage />} />
  </Router>
);

export default Routes;
