import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

export const getOwners: any = createAsyncThunk("owners", async () => {
  const url = "http://localhost:5000/api/v1/owners/";
  return await fetch(url).then((resp) => resp.json());
});

const initialState: any = {
  data: null,
  error: null,
  loading: null,
};

export const viewowners = createSlice({
  name: "viewowners",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOwners.fulfilled, (state, action) => {
        if (action.payload.status !== 200) {
          state.data = null;
          state.error = true;
          state.loading = false;
        } else if (action.payload.status === 200) {
          const { data } = action.payload;
          state.data = data;
          state.error = false;
          state.loading = false
        }
      })
      .addCase(getOwners.rejected, (state, action) => {
        state.data = null;
        state.error = true;
        state.loading = false
      });
  },
});

//export const { resetMyView } = viewmyreservations.actions;
export default viewowners.reducer;
