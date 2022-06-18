import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ClientType } from "../../types/types";

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
  valid: null,
  data: null,
};

export const createclient = createSlice({
  name: "client",
  initialState,
  reducers: {
    resetClient: () => initialState,
    setFromGoogle: (state, action) => {
      state.valid = action.payload.valid;
      state.data = action.payload.user;
    },
    setFromUpdate: (state, action) => {
      if (state.data !== null) {
        state.data.firstName = action.payload.firstName;
        state.data.lastName = action.payload.lastName;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(verifyToken.fulfilled, (state, action) => {
        if (action.payload.status !== 200) {
          state.valid = null;
          state.data = null;
        } else if (action.payload.status === 200) {
          state.valid = true;
          state.data = action.payload.data;
        }
      })
      .addCase(verifyToken.rejected, (state) => {
        state.valid = null;
        state.data = null;
      });
  },
});

export const { resetClient, setFromGoogle, setFromUpdate } =
  createclient.actions;
export default createclient.reducer;
