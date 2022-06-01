import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { PropertyState, FilterType } from "../../types/types";

export const getProperties: any = createAsyncThunk(
  "properties",
  async (query: FilterType) => {
    let url = "http://localhost:5000/api/v1/properties/?";
    Object.entries(query).forEach((entry: [string, string | number]) => {
      url += `${entry[0]}=${String(entry[1])}&`;
    });

    return await fetch(url).then((res) => res.json());
  }
);

const initialState: PropertyState = {
  data: [],
  loading: false,
  error: false,
  count: null,
};

export const properties = createSlice({
  name: "propertyfilter",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProperties.pending, (state, action) => {
        state.data = [];
        state.count = null;
        state.loading = true;
        state.error = false;
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.count = action.payload.count;
        state.error = false;
      })
      .addCase(getProperties.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.count = null;
        state.error = true;
      });
  },
});

export default properties.reducer;
