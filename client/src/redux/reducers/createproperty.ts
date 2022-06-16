import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PropertyType, ApiType } from "../../types/types";

export const createProperty = createAsyncThunk(
  "createproperty",
  async (data: { token: string; data: PropertyType }) => {
    const url = "http://localhost:5000/api/v1/properties/";
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

const initialState: ApiType = {
  data: null,
  error: false,
  success: false,
  message: "",
};

export const createproperty = createSlice({
  name: "createproperty",
  initialState,
  reducers: {
    resetCreateProp: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(createProperty.fulfilled, (state, action) => {
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
      .addCase(createProperty.rejected, (state) => {
        state.error = true;
        state.success = false;
        state.message = "there was a problem creating that property";
      });
  },
});

export const { resetCreateProp } = createproperty.actions;
export default createproperty.reducer;
