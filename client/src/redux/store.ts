import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import createclient from "./reducers/client";
import verifygoogle from "./reducers/verifygoogle";
import updateuser from "./reducers/updateuser";
import filterby from "./reducers/filterby";
import properties from "./reducers/properties";
import property from "./reducers/property";
import createreservation from "./reducers/createreservation";
import deletereservation from "./reducers/deletereservation";
import propertyreservations from "./reducers/resesrvationview";
import viewmyreservations from "./reducers/myreservations";
import viewowners from "./reducers/getowners";
import allproperties from "./reducers/allproperties";
import createproperty from "./reducers/createproperty";
import deleteproperty from "./reducers/deleteproperty";
import updateproperty from "./reducers/updateproperty";
import owner, { getOwner } from "./reducers/owner";
import createowner from "./reducers/createowner";
import deleteowner from "./reducers/deleteowner";
import updateowner from "./reducers/updateowner";
import propertyrefresh from "./reducers/propertyrefresh";
import ownerrefresh from "./reducers/ownerrefresh";

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
        const property = afterState.property;
        if (property.data && updated.success) {
          state.dispatch(getProperty(property.data._id!));
        }
        if (target === "updateProperty") {
          state.dispatch(crudRefresh());
        }
        break;
      case "ownerrefresh/modifiedOwnerTrue":
        const owner = afterState.owner;
        if (owner.data && updated.success) {
          state.dispatch(getOwner(owner.data._id!));
        }
        break;
    }
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
    properties: properties,
    filterBy: filterby,
    property: property,
    client: createclient,
    createReservation: createreservation,
    deleteReservation: deletereservation,
    reservationView: propertyreservations,
    myReservations: viewmyreservations,
    googleAuth: verifygoogle,
    updateUser: updateuser,
    owners: viewowners,
    createProperty: createproperty,
    deleteProperty: deleteproperty,
    updateProperty: updateproperty,
    getAllProperties: allproperties,
    addOwner: createowner,
    owner: owner,
    deleteOwner: deleteowner,
    updateOwner: updateowner,
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
