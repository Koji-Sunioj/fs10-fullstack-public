import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const formData = createSlice({
  name: "formData",
  initialState,
  reducers: {
    append: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { append } = formData.actions;

export const selectForm = (state: any) => state.formData;

export default formData.reducer;
