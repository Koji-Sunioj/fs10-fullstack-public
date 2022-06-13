import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const updateUser: any = createAsyncThunk(
  "updateuser",
  async (data: any) => {
    const url = "http://localhost:5000/api/v1/users/" + data.userId;
    return await fetch(url, {
      headers: {
        Authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(data.data),
      method: "PATCH",
    }).then((resp) => resp.json());
  }
);

const initialState: any = {
  success: null,
  error: null,
  message: null,
};

export const updateuser = createSlice({
  name: "updateuser",
  initialState,
  reducers: {
    resetUpdateUser: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
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
      .addCase(updateUser.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = "could not update resources";
      });
  },
});

export const { resetUpdateUser } = updateuser.actions;
export default updateuser.reducer;
