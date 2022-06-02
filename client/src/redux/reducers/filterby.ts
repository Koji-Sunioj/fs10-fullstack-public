import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
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
  },
});

export const searchState = (state: any) => state.filterby.searchBy;
export const { updateSearch, updatePage, updateDirection, updateSortCategory } =
  filterby.actions;
export default filterby.reducer;
