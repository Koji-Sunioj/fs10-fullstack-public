import { configureStore } from "@reduxjs/toolkit";
import formData from "./reducers/formData";

export const store = configureStore({
  reducer: { formData: formData },
});
