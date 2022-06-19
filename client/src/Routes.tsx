import { Routes as Router, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MyAccount from "./pages/MyAccount";
import PropertyPage from "./pages/PropertyPage";
import AdminPage from "./pages/AdminPage";
import CreateProperty from "./pages/CreateProperty";
import EditProperty from "./pages/EditProperty";
import CreateOwner from "./pages/CreateOwner";
import OwnerPage from "./pages/OwnerPage";
import EditOwner from "./pages/EditOwner";

const Routes = () => (
  <Router>
    <Route path="/" element={<HomePage />} />
    <Route path="/my-account" element={<MyAccount />} />
    <Route path="/admin" element={<AdminPage />} />
    <Route path="/admin/create-property" element={<CreateProperty />} />
    <Route path="/admin/edit-property/:propertyId" element={<EditProperty />} />
    <Route path="/admin/create-owner" element={<CreateOwner />} />
    <Route path="/admin/edit-owner/:ownerId" element={<EditOwner />} />
    <Route path="/property/:propertyId" element={<PropertyPage />} />
    <Route path="/owner/:ownerId" element={<OwnerPage />} />
  </Router>
);

export default Routes;
