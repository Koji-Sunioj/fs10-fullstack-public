import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

export const getOwner: any = createAsyncThunk(
  "owner",
  async (ownerId) => {
    let url = "http://localhost:5000/api/v1/owners/" + ownerId;
    return await fetch(url).then((res) => res.json());
  }
);

const initialState: any = {
  data: null,
  loading: false,
  error: false,
};

export const owner = createSlice({
  name: "propertyfilter",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOwner.pending, (state, action) => {
        state.data = null;
        state.loading = true;
        state.error = false;
      })
      .addCase(getOwner.fulfilled, (state, action) => {
        if (action.payload.data.length === 0){
          state.loading = false;
          state.data = null;
          state.error = true;
        }
        else
        {
          state.loading = false;
          state.data = action.payload.data[0];
          state.error = false;
        }
        
      })
      .addCase(getOwner.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = true;
      });
  },
});

export default owner.reducer;
