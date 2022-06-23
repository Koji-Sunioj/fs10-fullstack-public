import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { OwnerType, UpdateOwnerType } from "../../types/types";

export const patchOwner = createAsyncThunk(
  "updateowner",
  async (data: {
    ownerId: string;
    token: string;
    data: Omit<OwnerType, "_id">;
  }) => {
    const url = "http://localhost:5000/api/v1/owners/" + data.ownerId;
    return await await fetch(url, {
      headers: {
        Authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.data),
      method: "PATCH",
      mode: "cors",
    }).then((resp) => resp.json());
  }
);

const initialState: UpdateOwnerType = {
  error: false,
  success: false,
  message: "",
  data: null,
};

export const updateproperty = createSlice({
  name: "updateowner",
  initialState,
  reducers: {
    resetUpdateOwner: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(patchOwner.fulfilled, (state, action) => {
        if (action.payload.status !== 200) {
          state.success = false;
          state.error = true;
          state.message = action.payload.message;
          state.data = null;
        } else if (action.payload.status === 200) {
          state.success = true;
          state.error = false;
          state.message = action.payload.message;
          state.data = action.payload.data;
        }
      })
      .addCase(patchOwner.rejected, (state) => {
        state.success = false;
        state.error = true;
        state.message = "there was a problem updating that owner";
        state.data = null;
      });
  },
});

export const { resetUpdateOwner } = updateproperty.actions;
export default updateproperty.reducer;
