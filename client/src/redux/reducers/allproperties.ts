import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AllPropertiesType } from "../../types/types";

export const allProperties = createAsyncThunk("allproperties", async () => {
  let url = "http://localhost:5000/api/v1/properties/";
  return await fetch(url).then((res) => res.json());
});

export const initialState: AllPropertiesType = {
  data: null,
  loading: false,
  error: false,
};

export const allproperties = createSlice({
  name: "allproperties",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(allProperties.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(allProperties.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
        state.error = false;
      })
      .addCase(allProperties.rejected, (state) => {
        state.data = null;
        state.loading = false;
        state.error = true;
      });
  },
});

export default allproperties.reducer;
