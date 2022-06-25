import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import client from "./reducers/client";
import filterby from "./reducers/filterby";
import property from "./reducers/property";
import viewowners from "./reducers/getowners";
import properties from "./reducers/properties";
import owner, { getOwner } from "./reducers/owner";
import verifygoogle from "./reducers/verifygoogle";
import ownerrefresh from "./reducers/ownerrefresh";
import allproperties from "./reducers/allproperties";
import propertyrefresh from "./reducers/propertyrefresh";
import viewmyreservations from "./reducers/myreservations";
import propertyreservations from "./reducers/resesrvationview";
import {
  updateSearch,
  updatePage,
  updateDirection,
  updateSortCategory,
  resetFilter,
  crudRefresh,
} from "./reducers/filterby";
import { isAnyOf } from "@reduxjs/toolkit";
import { getProperties } from "./reducers/properties";
import { modifiedPropertyTrue } from "./reducers/propertyrefresh";
import { modifiedOwnerTrue } from "./reducers/ownerrefresh";
import { getProperty } from "./reducers/property";
import { AppType, UpdateType } from "../types/types";

const propertiesModifiedMiddlware = createListenerMiddleware();
const modifiedViewMiddleWare = createListenerMiddleware();

modifiedViewMiddleWare.startListening({
  matcher: isAnyOf(modifiedOwnerTrue, modifiedPropertyTrue),
  effect: (action, state) => {
    const afterState = state.getState() as AppType;
    const target = action.payload.from as keyof AppType;
    const updated = afterState[target] as UpdateType;
    switch (action.type) {
      case "propertyrefresh/modifiedPropertyTrue":
        const { property } = afterState;
        if (property.data && updated.success) {
          state.dispatch(getProperty(property.data._id!));
        }
        break;
      case "ownerrefresh/modifiedOwnerTrue":
        const { owner } = afterState;
        if (owner.data && updated.success) {
          state.dispatch(getOwner(owner.data._id!));
        }
        break;
    }
    target === "property" && state.dispatch(crudRefresh());
  },
});

propertiesModifiedMiddlware.startListening({
  matcher: isAnyOf(
    updateSearch,
    updatePage,
    updateDirection,
    updateSortCategory,
    resetFilter,
    crudRefresh
  ),
  effect: (action, state) => {
    const afterState = state.getState() as AppType;
    const filterBy = afterState.filterBy;
    state.dispatch(getProperties(filterBy));
  },
});

export const store = configureStore({
  reducer: {
    client: client,
    googleAuth: verifygoogle,
    property: property,
    owners: viewowners,
    owner: owner,
    properties: properties,
    filterBy: filterby,
    reservationView: propertyreservations,
    myReservations: viewmyreservations,
    getAllProperties: allproperties,
    propertyModified: propertyrefresh,
    ownerModified: ownerrefresh,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      propertiesModifiedMiddlware.middleware,
      modifiedViewMiddleWare.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type StateType = typeof store.getState;
export const useAppDispatch = () => useDispatch<AppDispatch>();
