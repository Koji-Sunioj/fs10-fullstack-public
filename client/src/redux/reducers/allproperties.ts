import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllProperties: any = createAsyncThunk(
  "allproperties",
  async () => {
    let url = "http://localhost:5000/api/v1/properties/";
    return await fetch(url).then((res) => res.json());
  }
);

export const initialState: any = {
  data: null,
  loading: null,
  error: null,
};

export const allproperties = createSlice({
  name: "allproperties",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllProperties.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = false;
      })
      .addCase(getAllProperties.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = true;
      });
  },
});

export default allproperties.reducer;
