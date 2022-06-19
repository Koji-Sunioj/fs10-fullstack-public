import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modified: false,
};

export const propertyrefresh = createSlice({
  name: "propertyrefresh",
  initialState,
  reducers: {
    toggleModifiedTrue: (state) => {
      state.modified = true;
    },
    toggleModifiedFalse: (state) => {
      state.modified = false;
    },
  },
});

export const { toggleModifiedTrue, toggleModifiedFalse } =
  propertyrefresh.actions;
export default propertyrefresh.reducer;
