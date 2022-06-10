import { useParams, Routes as Router, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MyAccount from "./pages/MyAccount";
import PropertyPage from "./pages/PropertyPage";
import AdminPage from "./pages/AdminPage";
import CreateProperty from "./pages/CreateProperty";
import EditProperty from "./pages/EditProperty";

const Routes = () => (
  <Router>
    <Route path="/" element={<HomePage />} />
    <Route path="/myaccount" element={<MyAccount />} />
    <Route path="/admin" element={<AdminPage />} />
    <Route path="/admin/create-property" element={<CreateProperty />} />
    <Route path="/admin/edit-property/:propertyId" element={<EditProperty />} />
    <Route path="/property/:propertyId" element={<PropertyPage />} />
  </Router>
);

export default Routes;
