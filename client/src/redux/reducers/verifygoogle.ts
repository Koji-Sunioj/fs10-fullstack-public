import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

export const verifyGoogle: any = createAsyncThunk(
  "googleauth",
  async (googleCred: any) => {
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

const initialState: any = {
  jwt: null,
  user: null,
};

export const verifygoogle = createSlice({
  name: "createreservation",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.jwt = null;
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(verifyGoogle.fulfilled, (state, action) => {
        state.jwt = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(verifyGoogle.rejected, (state, action) => {
        state.valid = null;
        state.data = null;
      });
  },
});

export const { resetAuth } = verifygoogle.actions;
export default verifygoogle.reducer;
