import { configureStore } from "@reduxjs/toolkit";
import properties from "./reducers/properties";
import filterby from "./reducers/filterby";
import property from "./reducers/property";

export const store = configureStore({
  reducer: { properties: properties, filterBy: filterby, property: property },
});
