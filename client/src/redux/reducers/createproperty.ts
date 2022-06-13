import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createProperty: any = createAsyncThunk(
  "createproperty",
  async (data: any) => {
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

const initialState: any = {
  data: null,
  error: null,
  success: null,
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
          state.success = false;
          state.error = true;
          state.message = action.payload.message;
        } else if (action.payload.status === 200) {
          state.success = true;
          state.error = false;
          state.message = action.payload.message;
          state.data = action.payload.data;
        }
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.success = false;
        state.error = true;
        state.message = "there was a problem creating that property";
      });
  },
});

export const { resetCreateProp } = createproperty.actions;
export default createproperty.reducer;
