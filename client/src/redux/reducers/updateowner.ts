import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

export const updateOwner: any = createAsyncThunk(
  "updateowner",
  async (data: any) => {
    const url = "http://localhost:5000/api/v1/owners/"+data.ownerId;
    return await await fetch(url, {
      headers: {
        Authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.data),
      method: "PATCH",
      mode: 'cors',
    }).then((resp) => resp.json());
  }
);

const initialState: any = {
  error: null,
  success: null,
  message: "",
};

export const updateproperty = createSlice({
  name: "updateowner",
  initialState,
  reducers: {
    resetUpdateOwner: ()=> initialState
  },
  extraReducers(builder) {
    builder
      .addCase(updateOwner.fulfilled, (state, action) => {
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
      .addCase(updateOwner.rejected, (state, action) => {
        state.success = false;
        state.error = true;
        state.message = "there was a problem updating that owner";
      });
  },
});

export const { resetUpdateOwner } = updateproperty.actions;
export default updateproperty.reducer;
