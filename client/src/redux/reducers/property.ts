import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

export const getPropery: any = createAsyncThunk(
  "property",
  async (propertyId) => {
    let url = "http://localhost:5000/api/v1/properties/" + propertyId;
    return await fetch(url).then((res) => res.json());
  }
);

const initialState: any = {
  data: null,
  loading: false,
  error: false,
};

export const properties = createSlice({
  name: "propertyfilter",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPropery.pending, (state, action) => {
        state.data = null;
        state.loading = true;
        state.error = false;
      })
      .addCase(getPropery.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data[0];
        state.error = false;
      })
      .addCase(getPropery.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = true;
      });
  },
});

export default properties.reducer;
