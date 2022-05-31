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
  pages: null,
};

export const properties = createSlice({
  name: "propertyfilter",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProperties.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pages = action.payload.pages;
      });
  },
});

export default properties.reducer;
