import { createSlice } from "@reduxjs/toolkit";
import { FilterStateType } from "../../types/types";

const initialState: FilterStateType = {
  searchBy: "",
  sortBy: "nightlyRate",
  page: 1,
  direction: -1,
};

export const filterby = createSlice({
  name: "propertyfilter",
  initialState,
  reducers: {
    updateSearch: (state, action) => {
      state.searchBy = action.payload;
      state.page = 1;
    },
    updatePage: (state, action) => {
      state.page = Number(action.payload);
    },
    updateDirection: (state, action) => {
      state.direction = Number(action.payload);
    },
    updateSortCategory: (state, action) => {
      state.sortBy = action.payload;
    },
    resetFilter: () => initialState,
    crudRefresh: (state) => state,
  },
});

export const {
  updateSearch,
  updatePage,
  updateDirection,
  updateSortCategory,
  resetFilter,
  crudRefresh,
} = filterby.actions;
export default filterby.reducer;
