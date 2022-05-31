import { configureStore } from "@reduxjs/toolkit";
import properties from "./reducers/properties";
import filterby from "./reducers/filterby";

export const store = configureStore({
  reducer: { properties: properties, filterBy: filterby },
});
