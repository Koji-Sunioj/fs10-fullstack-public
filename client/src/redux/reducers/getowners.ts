import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiType } from "../../types/types";

export const getOwners = createAsyncThunk("owners", async () => {
  const url = "http://localhost:5000/api/v1/owners/";
  return await fetch(url).then((resp) => resp.json());
});

const initialState: ApiType = {
  data: null,
  loading: false,
  error: false,
};

export const viewowners = createSlice({
  name: "owners",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOwners.fulfilled, (state, action) => {
        if (action.payload.status !== 200) {
          state.data = null;
          state.loading = false;
          state.error = true;
        } else if (action.payload.status === 200) {
          state.data = action.payload.data;
          state.error = false;
          state.loading = false;
        }
      })
      .addCase(getOwners.rejected, (state) => {
        state.data = null;
        state.loading = false;
        state.error = true;
      });
  },
});

export default viewowners.reducer;
