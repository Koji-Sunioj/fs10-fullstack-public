import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getMyReservations: any = createAsyncThunk(
  "myreservations",
  async (userId: any) => {
    const url = "http://localhost:5000/api/v1/reservations/?userId=" + userId;
    return await fetch(url).then((resp) => resp.json());
  }
);

const initialState: any = {
  loading: false,
  data: null,
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
      .addCase(getMyReservations.pending, (state, action) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getMyReservations.fulfilled, (state, action) => {
        if (action.payload.status !== 200) {
          state.loading = false;
          state.error = true;
        } else if (action.payload.status === 200) {
          const { data } = action.payload;
          state.data = data;
          state.loading = false;
          state.error = false;
        }
      })
      .addCase(getMyReservations.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = true;
      });
  },
});

export const { resetMyView } = viewmyreservations.actions;
export default viewmyreservations.reducer;
