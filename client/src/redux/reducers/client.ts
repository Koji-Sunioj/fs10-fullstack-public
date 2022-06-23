import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ClientType } from "../../types/types";
import { UserType } from "../../types/types";

export const patchUser = createAsyncThunk(
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

export const verifyToken = createAsyncThunk("client", async (token: string) => {
  const url = "http://localhost:5000/api/v1/verifytoken/?retrieve=true";
  return await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "get",
  }).then((resp) => resp.json());
});

const initialState: ClientType = {
  valid: false,
  data: null,
  message: "",
  success: false,
  error: false,
};

export const client = createSlice({
  name: "client",
  initialState,
  reducers: {
    resetClient: () => initialState,
    setFromGoogle: (state, action) => {
      state.valid = action.payload.valid;
      state.data = action.payload.user;
    },
    resetPatch: (state) => {
      state.error = false;
      state.success = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(verifyToken.fulfilled, (state, action) => {
        if (action.payload.status !== 200) {
          state.valid = false;
        } else if (action.payload.status === 200) {
          state.valid = true;
          state.data = action.payload.data;
        }
      })
      .addCase(verifyToken.rejected, (state) => {
        state.valid = false;
        state.data = null;
      })
      .addCase(patchUser.pending, (state) => {
        state.success = false;
        state.error = false;
      })
      .addCase(patchUser.fulfilled, (state, action) => {
        if (action.payload.status !== 200) {
          state.error = true;
          state.success = false;
          state.message = action.payload.message;
        } else if (action.payload.status === 200) {
          state.error = false;
          state.success = true;
          state.message = action.payload.message;
          state.data = action.payload.data;
        }
      })
      .addCase(patchUser.rejected, (state) => {
        state.error = true;
        state.success = false;
        state.message = "there was a problem updating your details";
      });
  },
});

export const { resetClient, setFromGoogle, resetPatch } = client.actions;
export default client.reducer;
