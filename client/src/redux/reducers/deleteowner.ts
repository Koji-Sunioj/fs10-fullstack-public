import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const deleteOwner: any = createAsyncThunk(
  "deleteowner",
  async (data: any) => {
    const url = "http://localhost:5000/api/v1/owners/" + data.ownerId;
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

export const deleteowner = createSlice({
  name: "deleteowner",
  initialState,
  reducers: {
    resetDeleteOwner: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(deleteOwner.fulfilled, (state, action) => {
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
      .addCase(deleteOwner.rejected, (state, action) => {
        state.success = false;
        state.error = true;
        state.message = "there was a problem deleting that property";
      });
  },
});

export const { resetDeleteOwner } = deleteowner.actions;
export default deleteowner.reducer;
