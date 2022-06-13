import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import properties from "./reducers/properties";
import filterby from "./reducers/filterby";
import property from "./reducers/property";
import createres from "./reducers/createres";
import createclient from "./reducers/client";
import deleteres from "./reducers/deleteres";
import updateuser from "./reducers/updateuser";
import viewpropres from "./reducers/resesrvationview";
import viewmyreservations from "./reducers/myreservations";
import verifygoogle from "./reducers/verifygoogle";
import viewowners  from "./reducers/getowners";
import createproperty from "./reducers/createproperty";
import deleteproperty from "./reducers/deleteproperty";
import updateproperty from "./reducers/updateproperty";
import allproperties from "./reducers/allproperties";
import createowner from "./reducers/createowner";
import owner from "./reducers/owner";
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
import { getProperties } from "./reducers/properties";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(
    updateSearch,
    updatePage,
    updateDirection,
    updateSortCategory,
    resetFilter,
    crudRefresh,
  ),
  effect: (action, something: any) => {
    const afterFilter: any = something.getState().filterBy;
    something.dispatch(getProperties(afterFilter));
  },
});

export const store = configureStore({
  reducer: {
    properties: properties,
    filterBy: filterby,
    property: property,
    createRes: createres,
    client: createclient,
    deleteRes: deleteres,
    reservationView: viewpropres,
    myReservations: viewmyreservations,
    googleAuth: verifygoogle,
    updateUser: updateuser,
    owners: viewowners,
    createProp: createproperty,
    deleteProp: deleteproperty,
    updateProp:updateproperty,
    getAllProperties: allproperties,
    addOwner: createowner,
    owner: owner,
    deleteOwner: deleteowner,
    updateOwner: updateowner
  },
  // Add the listener middleware to the store.
  // NOTE: Since this can receive actions with functions inside,
  // it should go before the serializability check middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
