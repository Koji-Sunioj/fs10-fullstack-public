import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiType } from "../../types/types";

export const deleteProperty = createAsyncThunk(
  "deleteproperty",
  async (data: { token: string; propertyId: string }) => {
    const url = "http://localhost:5000/api/v1/properties/" + data.propertyId;
    return await await fetch(url, {
      headers: {
        Authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
      method: "delete",
    }).then((resp) => resp.json());
  }
);

const initialState: ApiType = {
  error: false,
  success: false,
  message: "",
};

export const deleteproperty = createSlice({
  name: "deleteproperty",
  initialState,
  reducers: {
    resetDeleteProperty: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(deleteProperty.fulfilled, (state, action) => {
        if (action.payload.status !== 200) {
          state.error = true;
          state.success = false;
          state.message = action.payload.message;
        } else if (action.payload.status === 200) {
          state.error = false;
          state.success = true;
          state.message = action.payload.message;
        }
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = "there was a problem deleting that property";
      });
  },
});

export const { resetDeleteProperty } = deleteproperty.actions;
export default deleteproperty.reducer;
