import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ReservationType, UpdateType } from "../../types/types";

export const createReservation = createAsyncThunk(
  "reservation",
  async (data: { token: string; data: ReservationType }) => {
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

const initialState: UpdateType & { loading: boolean } = {
  loading: false,
  error: false,
  success: false,
  message: "",
};

export const createreservation = createSlice({
  name: "createreservation",
  initialState,
  reducers: {
    resetCreateReservation: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(createReservation.pending, (state, action) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        if (action.payload.status !== 200) {
          state.success = false;
          state.loading = false;
          state.error = true;
          state.message = action.payload.message;
        } else if (action.payload.status === 200) {
          const { data } = action.payload;
          state.success = true;
          state.loading = false;
          state.error = false;
          state.message = `reservation created for starting ${
            data.startDate.split("T")[0]
          } on for ${data.nights} nights`;
        }
      })
      .addCase(createReservation.rejected, (state) => {
        state.success = false;
        state.loading = false;
        state.error = true;
        state.message = "there was a problem creating that reservation";
      });
  },
});

export const { resetCreateReservation } = createreservation.actions;
export default createreservation.reducer;
