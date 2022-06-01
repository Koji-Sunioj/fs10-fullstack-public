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
};

export const properties = createSlice({
  name: "propertyfilter",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPropery.pending, (state, action) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(getPropery.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data[0];
      });
  },
});

export default properties.reducer;
