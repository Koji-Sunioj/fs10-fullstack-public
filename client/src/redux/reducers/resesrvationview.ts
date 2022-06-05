import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

export const reservationView: any = createAsyncThunk(
  "reservationview",
  async (propertyId: any) => {
    const url =
      "http://localhost:5000/api/v1/reservations/?propertyId=" + propertyId;
    return await fetch(url).then((resp) => resp.json());
  }
);

const initialState: any = {
  loading: false,
  data: null,
  error: false,
};

export const viewpropres = createSlice({
  name: "viewreservations",
  initialState,
  reducers: {
    resetResView: (state) => {
      state.loading = false;
      state.error = null;
      state.property = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(reservationView.pending, (state, action) => {
        state.success = false;
        state.loading = true;
        state.data = null;
      })
      .addCase(reservationView.fulfilled, (state, action) => {
        if (action.payload.status === 403) {
          state.loading = false;
          state.error = true;
        } else if (action.payload.status === 200) {
          const { data } = action.payload;
          state.data = data;
          state.loading = false;
          state.error = false;
        }
      })
      .addCase(reservationView.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = true;
      });
  },
});

export const { resetResView } = viewpropres.actions;
export default viewpropres.reducer;
