import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProperties: any = createAsyncThunk("something", async () => {
  return await fetch(
    "http://localhost:5000/api/v1/properties/?searchBy=cottage"
  ).then((res) => res.json());
});

const initialState: any = { data: [] };

export const properties: any = createSlice({
  name: "propertyfilter",
  initialState,
  reducers: {},
  extraReducers: {
    /*[getProperties.pending]: (state, action) => {

    },*/
    [getProperties.fulfilled]: (state, action) => {
      state.data = action.payload.data;
    },
  },
});

export default properties.reducer;
