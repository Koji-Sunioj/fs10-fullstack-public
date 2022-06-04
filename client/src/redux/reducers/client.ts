import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

export const verifyToken: any = createAsyncThunk(
  "token",
  async (token: any) => {
    const url = "http://localhost:5000/api/v1/verifytoken/";
    console.log(token);
    return await await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "get",
    }).then((resp) => resp.json());
  }
);

const initialState: any = {
  valid: null,
  data: null,
};

export const createclient = createSlice({
  name: "createreservation",
  initialState,
  reducers: {
    resetClient: (state) => {
      state.valid = null;
      state.data = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(verifyToken.fulfilled, (state, action) => {
        if (action.payload.status === 403) {
          state.valid = false;
          state.data = null;
        } else if (action.payload.status === 200) {
          console.log(action.payload);
          state.valid = true;
          state.data = action.payload.data;
        }
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.valid = null;
        state.data = null;
      });
  },
});

export const { resetClient } = createclient.actions;
export default createclient.reducer;
