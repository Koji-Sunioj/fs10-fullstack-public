import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

export const deleteReservation: any = createAsyncThunk(
  "delete-reservation",
  async (data: any) => {
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

const initialState: any = {
  error: false,
  success: false,
  message: "",
};

export const deleteres = createSlice({
  name: "createreservation",
  initialState,
  reducers: {
    resetDel: (state) => {
      state.error = false;
      state.success = false;
      state.message = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(deleteReservation.fulfilled, (state, action) => {
        if (action.payload.status === 403) {
          state.success = false;
          state.error = true;
          state.message = action.payload.message;
        } else if (action.payload.status === 200) {
          state.success = true;
          state.error = false;
          state.message = action.payload.message;
        }
      })
      .addCase(deleteReservation.rejected, (state, action) => {
        state.success = false;
        state.error = true;
        state.message = "error processing request";
      });
  },
});

export const { resetDel } = deleteres.actions;
export default deleteres.reducer;
