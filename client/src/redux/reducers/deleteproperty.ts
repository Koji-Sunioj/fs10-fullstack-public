import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const deleteProperty: any = createAsyncThunk(
  "deleteproperty",
  async (data: any) => {
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

const initialState: any = {
  error: null,
  success: null,
  message: "",
};

export const deleteproperty = createSlice({
  name: "deleteproperty",
  initialState,
  reducers: {
    resetDeleteProp: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(deleteProperty.fulfilled, (state, action) => {
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
      .addCase(deleteProperty.rejected, (state, action) => {
        state.success = false;
        state.error = true;
        state.message = "there was a problem deleting that property";
      });
  },
});

export const { resetDeleteProp } = deleteproperty.actions;
export default deleteproperty.reducer;
