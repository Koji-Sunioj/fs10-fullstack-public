import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  modified: false,
};

export const propertyrefresh = createSlice({
  name: "propertyrefresh",
  initialState,
  reducers: {
    toggleModifiedTrue: (state) => {
      console.log("modified true");
      state.modified = true;
    },
    toggleModifiedFalse: (state) => {
      console.log("modified false");
      state.modified = false;
    },
  },
});

export const { toggleModifiedTrue, toggleModifiedFalse } =
  propertyrefresh.actions;
export default propertyrefresh.reducer;
