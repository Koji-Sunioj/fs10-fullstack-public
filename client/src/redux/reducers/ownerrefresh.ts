import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modified: false,
  from: null,
};

export const ownerrefresh = createSlice({
  name: "ownerrefresh",
  initialState,
  reducers: {
    modifiedOwnerTrue: (state, action) => {
      state.modified = true;
      state.from = action.payload.from;
    },
    modifiedOwnerFalse: (state) => {
      state.modified = false;
      state.from = null;
    },
  },
});

export const { modifiedOwnerTrue, modifiedOwnerFalse } = ownerrefresh.actions;
export default ownerrefresh.reducer;
