import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchOwnerType } from "../../types/types";

export const getOwner = createAsyncThunk("owner", async (ownerId: string) => {
  let url = "http://localhost:5000/api/v1/owners/" + ownerId;
  return await fetch(url).then((res) => res.json());
});

const initialState: FetchOwnerType = {
  data: null,
  loading: false,
  error: false,
};

export const owner = createSlice({
  name: "owner",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOwner.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getOwner.fulfilled, (state, action) => {
        if (action.payload.data.length === 0) {
          state.data = null;
          state.loading = false;
          state.error = true;
        } else {
          state.data = action.payload.data[0];
          state.loading = false;
          state.error = false;
        }
      })
      .addCase(getOwner.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = true;
      });
  },
});

export default owner.reducer;
