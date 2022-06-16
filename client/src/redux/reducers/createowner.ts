import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { OwnerType, CreateOwnerType } from "../../types/types";

export const createOwner = createAsyncThunk(
  "createowner",
  async (data: { data: Omit<OwnerType, "_id">; token: string }) => {
    const url = "http://localhost:5000/api/v1/owners/";
    return await await fetch(url, {
      headers: {
        Authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.data),
      method: "post",
    }).then((resp) => resp.json());
  }
);

const initialState: CreateOwnerType = {
  data: null,
  error: false,
  success: false,
  message: "",
};

export const creatowner = createSlice({
  name: "createowner",
  initialState,
  reducers: {
    resetCreateOwner: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(createOwner.fulfilled, (state, action) => {
        if (action.payload.status !== 200) {
          state.error = true;
          state.success = false;
          state.message = action.payload.message;
        } else if (action.payload.status === 200) {
          state.data = action.payload.data;
          state.error = false;
          state.success = true;
          state.message = action.payload.message;
        }
      })
      .addCase(createOwner.rejected, (state) => {
        state.error = true;
        state.success = false;
        state.message = "there was a problem creating that owner";
      });
  },
});

export const { resetCreateOwner } = creatowner.actions;
export default creatowner.reducer;
