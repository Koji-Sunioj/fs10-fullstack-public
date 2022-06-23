import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MyReservationsStateType } from "../../types/types";

export const getMyReservations = createAsyncThunk(
  "viewmyreservations",
  async (userId: string) => {
    const url = "http://localhost:5000/api/v1/reservations/?userId=" + userId;
    return await fetch(url).then((resp) => resp.json());
  }
);

export const initialState: MyReservationsStateType = {
  data: null,
  loading: false,
  error: false,
};

export const viewmyreservations = createSlice({
  name: "viewmyreservations",
  initialState,
  reducers: {
    resetMyView: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(getMyReservations.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getMyReservations.fulfilled, (state, action) => {
        if (action.payload.status !== 200) {
          state.loading = false;
          state.error = true;
        } else if (action.payload.status === 200) {
          state.data = action.payload.data;
          state.loading = false;
          state.error = false;
        }
      })
      .addCase(getMyReservations.rejected, (state) => {
        state.data = null;
        state.loading = false;
        state.error = true;
      });
  },
});

export const { resetMyView } = viewmyreservations.actions;
export default viewmyreservations.reducer;
