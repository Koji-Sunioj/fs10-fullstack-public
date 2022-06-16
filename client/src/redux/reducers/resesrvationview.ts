import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchReservationViewType } from "../../types/types";

export const reservationView = createAsyncThunk(
  "reservationview",
  async (propertyId: string) => {
    const url =
      "http://localhost:5000/api/v1/reservations/?propertyId=" + propertyId;
    return await fetch(url).then((resp) => resp.json());
  }
);

const initialState: FetchReservationViewType = {
  loading: false,
  error: false,
  data: null,
};

export const propertyreservations = createSlice({
  name: "viewreservations",
  initialState,
  reducers: {
    resetResView: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(reservationView.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(reservationView.fulfilled, (state, action) => {
        if (action.payload.status === 403) {
          state.loading = false;
          state.error = true;
        } else if (action.payload.status === 200) {
          state.data = action.payload.data;
          state.loading = false;
          state.error = false;
        }
      })
      .addCase(reservationView.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { resetResView } = propertyreservations.actions;
export default propertyreservations.reducer;
