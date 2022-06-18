import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateType, UserType } from "../../types/types";

export const updateUser = createAsyncThunk(
  "updateuser",
  async (data: { token: string; userId: string; data: Partial<UserType> }) => {
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

const initialState: UpdateType = {
  success: false,
  error: false,
  message: "",
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
      .addCase(updateUser.pending, (state) => {
        return { ...state };
      })
      .addCase(updateUser.rejected, (state) => {
        state.error = true;
        state.success = false;
        state.message = "there was a problem updating your details";
      });
  },
});

export const { resetUpdateUser } = updateuser.actions;
export default updateuser.reducer;
