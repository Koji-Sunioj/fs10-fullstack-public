import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { OwnerStateTpe, OwnerType } from "../../types/types";

export const getOwner = createAsyncThunk("owner", async (ownerId: string) => {
  let url = "http://localhost:5000/api/v1/owners/" + ownerId;
  return await fetch(url).then((res) => res.json());
});

export const createOwner = createAsyncThunk(
  "createowner2",
  async (data: { data: Omit<OwnerType, "_id">; token: string }) => {
    const url = "http://localhost:5000/api/v1/owners/";
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

export const patchOwner = createAsyncThunk(
  "updateowner2",
  async (data: {
    ownerId: string;
    token: string;
    data: Omit<OwnerType, "_id">;
  }) => {
    const url = "http://localhost:5000/api/v1/owners/" + data.ownerId;
    return await await fetch(url, {
      headers: {
        Authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.data),
      method: "PATCH",
      mode: "cors",
    }).then((resp) => resp.json());
  }
);

export const removeOwner = createAsyncThunk(
  "removeowner2",
  async (data: { token: string; ownerId: string }) => {
    const url = "http://localhost:5000/api/v1/owners/" + data.ownerId;
    return await await fetch(url, {
      headers: {
        Authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
      method: "delete",
    }).then((resp) => resp.json());
  }
);

const initialState: OwnerStateTpe = {
  data: null,
  loading: false,
  error: false,
  message: "",
  success: false,
  purged: false,
};

export const owner = createSlice({
  name: "owner",
  initialState,
  reducers: {
    resetEdit: (state) => {
      state.success = false;
      state.purged = false;
    },
    flushOwner: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(getOwner.pending, (state) => {
        state.data = null;
        state.loading = true;
        state.error = false;
        state.message = "";
        state.purged = false;
        state.success = false;
      })
      .addCase(getOwner.fulfilled, (state, action) => {
        if (action.payload.data.length === 0) {
          state.data = null;
          state.loading = false;
          state.error = true;
        } else {
          state.data = action.payload.data;
          state.loading = false;
          state.error = false;
        }
      })
      .addCase(getOwner.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = true;
      })
      .addCase(createOwner.fulfilled, (state, action) => {
        if (action.payload.status !== 200) {
          state.error = true;
          state.success = false;
          state.message = action.payload.message;
        } else if (action.payload.status === 200) {
          state.data = action.payload.data;
          state.error = false;
          state.success = true;
          state.message = action.payload.message;
        }
      })
      .addCase(createOwner.rejected, (state) => {
        state.error = true;
        state.success = false;
        state.message = "there was a problem creating that owner";
      })
      .addCase(patchOwner.fulfilled, (state, action) => {
        if (action.payload.status !== 200) {
          state.success = false;
          state.error = true;
          state.message = action.payload.message;
          state.data = null;
        } else if (action.payload.status === 200) {
          state.success = true;
          state.error = false;
          state.message = action.payload.message;
          state.data = action.payload.data;
        }
      })
      .addCase(patchOwner.rejected, (state) => {
        state.success = false;
        state.error = true;
        state.message = "there was a problem updating that owner";
        state.data = null;
      })
      .addCase(removeOwner.fulfilled, (state, action) => {
        if (action.payload.status !== 200) {
          state.error = true;
          state.message = action.payload.message;
        } else if (action.payload.status === 200) {
          state.error = false;
          state.purged = true;
          state.message = action.payload.message;
        }
      })
      .addCase(removeOwner.rejected, (state) => {
        state.error = true;
        state.success = false;
        state.message = "there was a problem deleting that owner";
      });
  },
});
export const { resetEdit, flushOwner } = owner.actions;
export default owner.reducer;
