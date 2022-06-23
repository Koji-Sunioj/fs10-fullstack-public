import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateType } from "../../types/types";

export const removeReservation = createAsyncThunk(
  "removereservation",
  async (data: { token: string; reservationId: string }) => {
    const url =
      "http://localhost:5000/api/v1/reservations/" + data.reservationId;
    return await await fetch(url, {
      headers: {
        Authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
      method: "delete",
    }).then((resp) => resp.json());
  }
);

const initialState: UpdateType = {
  error: false,
  success: false,
  message: "",
};

export const deletereservation = createSlice({
  name: "deletereservation",
  initialState,
  reducers: {
    resetDeleteReservation: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(removeReservation.fulfilled, (state, action) => {
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
      .addCase(removeReservation.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = "error processing request";
      });
  },
});

export const { resetDeleteReservation } = deletereservation.actions;
export default deletereservation.reducer;
