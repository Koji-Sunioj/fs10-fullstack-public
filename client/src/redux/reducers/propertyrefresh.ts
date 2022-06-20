import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modified: false,
  from: null,
};

export const propertyrefresh = createSlice({
  name: "propertyrefresh",
  initialState,
  reducers: {
    modifiedPropertyTrue: (state, action) => {
      state.modified = true;
      state.from = action.payload.from;
    },
    modifiedPropertyFalse: (state) => {
      state.modified = false;
      state.from = null;
    },
  },
});

export const { modifiedPropertyTrue, modifiedPropertyFalse } =
  propertyrefresh.actions;
export default propertyrefresh.reducer;
