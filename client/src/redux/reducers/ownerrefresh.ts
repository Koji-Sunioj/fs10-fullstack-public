import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modified: false,
};

export const ownerrefresh = createSlice({
  name: "ownerrefresh",
  initialState,
  reducers: {
    modifiedOwnerTrue: (state) => {
      state.modified = true;
    },
    modifiedOwnerFalse: (state) => {
      state.modified = false;
    },
  },
});

export const { modifiedOwnerTrue, modifiedOwnerFalse } = ownerrefresh.actions;
export default ownerrefresh.reducer;
