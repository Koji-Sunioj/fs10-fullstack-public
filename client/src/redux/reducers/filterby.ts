import { createSlice, current } from "@reduxjs/toolkit";
import { FilterType } from "../../types/types";

const initialState: FilterType = {
  searchBy: "",
  sortBy: "nightlyRate",
  page: 1,
  direction: -1,
};

export const filterby = createSlice({
  name: "propertyfilter",
  initialState,
  reducers: {},
});

export default filterby.reducer;
