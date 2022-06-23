import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ReservationViewStateType, ReservationType } from "../../types/types";

export const propertyReservations = createAsyncThunk(
  "propertyreservations",
  async (propertyId: string) => {
    const url =
      "http://localhost:5000/api/v1/reservations/?propertyId=" + propertyId;
    return await fetch(url).then((resp) => resp.json());
  }
);

export const addReservation = createAsyncThunk(
  "addreservation",
  async (data: { token: string; data: Partial<ReservationType> }) => {
    const url = "http://localhost:5000/api/v1/reservations/";
    return await await fetch(url, {
      headers: {
        Authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.data),
      method: "post",
    }).then((resp) => resp.json());
  }
);

export const removeReservation = createAsyncThunk(
  "removereservation3",
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

const initialState: ReservationViewStateType = {
  loading: false,
  error: false,
  data: null,
  success: false,
  message: "",
};

export const propertyreservations = createSlice({
  name: "propertyreservations",
  initialState,
  reducers: {
    resetResView: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(propertyReservations.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(propertyReservations.fulfilled, (state, action) => {
        if (action.payload.status !== 200) {
          state.loading = false;
          state.error = true;
        } else if (action.payload.status === 200) {
          state.data = action.payload.data;
          state.loading = false;
          state.error = false;
        }
      })
      .addCase(propertyReservations.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addReservation.fulfilled, (state, action) => {
        if (action.payload.status !== 200) {
          state.success = false;
          state.error = true;
          state.message = action.payload.message;
        } else if (action.payload.status === 200) {
          const reservation = action.payload.data;
          state.success = true;
          state.error = false;
          state.message = `reservation created for starting ${
            reservation.startDate.split("T")[0]
          } on for ${reservation.nights} nights`;
          state.data!.push(reservation);
        }
      })
      .addCase(addReservation.rejected, (state) => {
        state.success = false;
        state.error = true;
        state.message = "there was a problem creating that reservation";
      })
      .addCase(removeReservation.fulfilled, (state, action) => {
        if (action.payload.status !== 200) {
          state.error = true;
          state.success = false;
          state.message = action.payload.message;
        } else if (action.payload.status === 200) {
          const { _id } = action.payload;
          state.data = state.data!.filter(
            (reservation) => reservation._id !== _id
          );
          state.error = false;
          state.success = true;
          state.message = action.payload.message;
        }
      })
      .addCase(removeReservation.rejected, (state) => {
        state.error = true;
        state.success = false;
        state.message = "error processing request";
      });
  },
});

export const { resetResView } = propertyreservations.actions;
export default propertyreservations.reducer;
