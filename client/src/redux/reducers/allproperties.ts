import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiType } from "../../types/types";

export const getAllProperties = createAsyncThunk("allproperties", async () => {
  let url = "http://localhost:5000/api/v1/properties/";
  return await fetch(url).then((res) => res.json());
});

export const initialState: ApiType = {
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
      .addCase(getAllProperties.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
        state.error = false;
      })
      .addCase(getAllProperties.rejected, (state) => {
        state.data = null;
        state.loading = false;
        state.error = true;
      });
  },
});

export default allproperties.reducer;
