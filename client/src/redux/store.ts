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
import owner from "./reducers/owner";
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
import { toggleModifiedTrue } from "./reducers/propertyrefresh";
import { getProperty } from "./reducers/property";
import { AppType } from "../types/types";

const propertyCrudMiddleWare = createListenerMiddleware();
const propertiesCrudMiddlware = createListenerMiddleware();

propertyCrudMiddleWare.startListening({
  matcher: isAnyOf(toggleModifiedTrue),
  effect: (action, state) => {
    const afterState = state.getState() as AppType;
    const property = afterState.property;
    if (
      property.data !== null &&
      property.data !== undefined &&
      "_id" in property.data
    ) {
      state.dispatch(getProperty(property.data._id!));
    }
  },
});

propertiesCrudMiddlware.startListening({
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
      propertiesCrudMiddlware.middleware,
      propertyCrudMiddleWare.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type StateType = typeof store.getState;
export const useAppDispatch = () => useDispatch<AppDispatch>();
