import { configureStore } from "@reduxjs/toolkit";
import properties from "./reducers/properties";

export const store = configureStore({
  reducer: { properties: properties },
});
