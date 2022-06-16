import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiType } from "../../types/types";

export const getProperty = createAsyncThunk(
  "property",
  async (propertyId: string) => {
    let url = "http://localhost:5000/api/v1/properties/" + propertyId;
    return await fetch(url).then((res) => res.json());
  }
);

const initialState: ApiType = {
  data: null,
  loading: false,
  error: false,
};

export const properties = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProperty.pending, (state) => {
        state.data = null;
        state.loading = true;
        state.error = false;
      })
      .addCase(getProperty.fulfilled, (state, action) => {
        if (action.payload.data.length === 0) {
          state.data = null;
          state.loading = false;
          state.error = true;
        } else {
          state.data = action.payload.data[0];
          state.loading = false;
          state.error = false;
        }
      })
      .addCase(getProperty.rejected, (state) => {
        state.data = null;
        state.loading = false;
        state.error = true;
      });
  },
});

export default properties.reducer;
