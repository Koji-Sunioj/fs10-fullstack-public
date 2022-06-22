import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PropertyType, PropertyStateType } from "../../types/types";

export const getProperty = createAsyncThunk(
  "getProperty",
  async (propertyId: string) => {
    let url = "http://localhost:5000/api/v1/properties/" + propertyId;
    return await fetch(url).then((res) => res.json());
  }
);

export const createProperty = createAsyncThunk(
  "createproperty",
  async (data: { token: string; data: Omit<PropertyType, "_id"> }) => {
    const url = "http://localhost:5000/api/v1/properties/";
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

export const deleteProperty = createAsyncThunk(
  "deleteproperty",
  async (data: { token: string; propertyId: string }) => {
    const url = "http://localhost:5000/api/v1/properties/" + data.propertyId;
    return await await fetch(url, {
      headers: {
        Authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
      method: "delete",
    }).then((resp) => resp.json());
  }
);

export const updateProperty = createAsyncThunk(
  "updateproperty",
  async (data: {
    token: string;
    propertyId: string;
    data: Omit<PropertyType, "_id">;
  }) => {
    const url = "http://localhost:5000/api/v1/properties/" + data.propertyId;
    return await fetch(url, {
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

const initialState: PropertyStateType = {
  data: null,
  loading: false,
  error: false,
  message: "",
  success: false,
  purged: false,
};

export const property = createSlice({
  name: "property",
  initialState,
  reducers: {
    flushProperty: () => initialState,
    resetEdit: (state) => {
      state.success = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProperty.pending, (state) => {
        state.data = null;
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(getProperty.fulfilled, (state, action) => {
        if (action.payload.data.length === 0) {
          state.loading = false;
          state.error = true;
        } else {
          state.data = action.payload.data;
          state.loading = false;
        }
      })
      .addCase(getProperty.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        if (action.payload.status !== 200) {
          state.error = true;
          state.message = action.payload.message;
        } else if (action.payload.status === 200) {
          state.success = true;
          state.error = false;
          state.data = action.payload.data;
          state.message = action.payload.message;
        }
      })
      .addCase(createProperty.rejected, (state) => {
        state.data = null;
        state.error = true;
        state.loading = false;
        state.message = "there was a problem creating that property";
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        if (action.payload.status !== 200) {
          state.error = true;
          state.message = action.payload.message;
        } else if (action.payload.status === 200) {
          state.success = true;
          state.error = false;
          state.data = action.payload.data;
          state.message = action.payload.message;
        }
      })
      .addCase(updateProperty.rejected, (state) => {
        state.error = true;
        state.message = "there was a problem updating that property";
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        if (action.payload.status !== 200) {
          state.error = true;
          state.message = action.payload.message;
        } else if (action.payload.status === 200) {
          state.purged = true;
          state.error = false;
          state.message = action.payload.message;
        }
      })
      .addCase(deleteProperty.rejected, (state) => {
        state.error = true;
        state.message = "there was a problem deleting that property";
      });
  },
});

export const { flushProperty, resetEdit } = property.actions;
export default property.reducer;
