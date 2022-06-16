import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PropertyType, UpdateType } from "../../types/types";

export const updateProperty = createAsyncThunk(
  "updateproperty",
  async (data: {
    token: string;
    propertyId: string;
    data: Omit<PropertyType, "_id">;
  }) => {
    const url = "http://localhost:5000/api/v1/properties/" + data.propertyId;
    return await fetch(url, {
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

const initialState: UpdateType = {
  error: false,
  success: false,
  message: "",
};

export const updateproperty = createSlice({
  name: "updateproperty",
  initialState,
  reducers: {
    resetUpdateProp: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(updateProperty.fulfilled, (state, action) => {
        if (action.payload.status !== 200) {
          state.success = false;
          state.error = true;
          state.message = action.payload.message;
        } else if (action.payload.status === 200) {
          state.success = true;
          state.error = false;
          state.message = action.payload.message;
        }
      })
      .addCase(updateProperty.rejected, (state) => {
        state.success = false;
        state.error = true;
        state.message = "there was a problem creating that property";
      });
  },
});

export const { resetUpdateProp } = updateproperty.actions;
export default updateproperty.reducer;
