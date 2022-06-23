import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GoogleStateType } from "../../types/types";

export const verifyGoogle = createAsyncThunk(
  "googleauth",
  async (googleCred: string) => {
    const url = "http://localhost:5000/google-login";
    return await fetch(url, {
      headers: {
        Authorization: `Bearer ${googleCred}`,
        "Content-Type": "application/json",
      },
      method: "post",
    }).then((resp) => resp.json());
  }
);

const initialState: GoogleStateType = {
  jwt: null,
  user: null,
};

export const verifygoogle = createSlice({
  name: "verifygoogle",
  initialState,
  reducers: {
    resetAuth: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(verifyGoogle.fulfilled, (state, action) => {
        state.jwt = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(verifyGoogle.rejected, (state, action) => {
        state.jwt = null;
        state.user = null;
      });
  },
});

export const { resetAuth } = verifygoogle.actions;
export default verifygoogle.reducer;
