import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

export const createReservation: any = createAsyncThunk(
  "reservation",
  async (data: any) => {
    const url = "http://localhost:5000/api/v1/reservations/";
    console.log(data);
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

const initialState: any = {
  loading: false,
  error: false,
  success: false,
  message: "",
};

export const createres = createSlice({
  name: "createreservation",
  initialState,
  reducers: {
    resetRes: () =>  initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(createReservation.pending, (state, action) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        if (action.payload.status === 403) {
          state.success = false;
          state.loading = false;
          state.error = true;
          state.message = "there was a problem creating that reservation";
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
      .addCase(createReservation.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = true;
        state.message = "there was a problem creating that reservation";
      });
  },
});

export const { resetRes } = createres.actions;
export default createres.reducer;
