import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
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

import {
  updateSearch,
  updatePage,
  updateDirection,
  updateSortCategory,
  resetFilter,
  crudRefresh,
} from "./reducers/filterby";
import { isAnyOf } from "@reduxjs/toolkit";
import propertyrefresh from "./reducers/propertyrefresh";
import { getProperties } from "./reducers/properties";
import { toggleModifiedTrue } from "./reducers/propertyrefresh";
import { getProperty } from "./reducers/property";

const propertyCrudMiddleWare = createListenerMiddleware();
const propertiesCrudMiddlware = createListenerMiddleware();

propertyCrudMiddleWare.startListening({
  matcher: isAnyOf(toggleModifiedTrue),
  effect: (action, state: any) => {
    const property: any = state.getState().property;
    if (property.data !== null) {
      state.dispatch(getProperty(property.data._id));
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
  effect: (action, state: any) => {
    const afterFilter: any = state.getState().filterBy;
    state.dispatch(getProperties(afterFilter));
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
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      propertiesCrudMiddlware.middleware,
      propertyCrudMiddleWare.middleware
    ),
});
