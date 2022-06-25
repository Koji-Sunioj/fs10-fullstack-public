export type AppType = {
  googleAuth: GoogleStateType;
  client: ClientStateType;
  property: PropertyStateType;
  filterBy: FilterStateType;
  getAllProperties: AllPropertiesType;
  owner: OwnerStateTpe;
  owners: AllOwnersStateType;
  properties: PropertiesQueryStateType;
  reservationView: ReservationViewStateType;
  myReservations: MyReservationsStateType;
  ownerModified: { modified: boolean };
};

//types for functional components

export type UserViewType = {
  client: ClientStateType;
  children?: JSX.Element[];
};

export type OwnerFormType = {
  properties: AllPropertiesType;
  owner?: OwnerWithPropertiesType;
  submitted: boolean;
  sendOwner: (owner: Omit<OwnerType, "_id">) => void;
};

export type PropertyFormType = {
  owners: AllOwnersStateType;
  property?: Omit<PropertyType, "owners"> & {
    properties: PropertyType[];
    owners: OwnerType[];
  };
  submitted: boolean;
  sendProperty: (property: Omit<PropertyType, "_id">) => void;
};

export type CalendarType = {
  decrementFocus: React.MouseEventHandler<HTMLButtonElement>;
  incrementFocus: React.MouseEventHandler<HTMLButtonElement>;
  bookedDates: string[];
  disabled: boolean;
  focusDay: moment.Moment;
  setCheckIn: React.Dispatch<React.SetStateAction<string>>;
};

export type UpdateType = {
  message: string;
  success: boolean;
  error: boolean;
};

// state types

export type GoogleStateType = {
  jwt: null | string;
  user: null | string;
};

export type AllPropertiesType = {
  data: null | PropertyType[];
  loading: boolean;
  error: boolean;
};

export type ReservationViewStateType = {
  data: null | Partial<ReservationType>[];
  message: string;
  success: boolean;
  loading: boolean;
  error: boolean;
};

export type PropertyStateType = {
  data:
    | null
    | (Omit<PropertyType, "owners"> & {
        properties: PropertyType[];
        owners: OwnerType[];
      });
  purged: boolean;
  message: string;
  success: boolean;
  loading: boolean;
  error: boolean;
};

export type PropertiesQueryStateType = {
  data: null | PropertyType[];
  loading: boolean;
  error: boolean;
  count: null | number;
};

export type MyReservationsStateType = {
  data: null | MyReservationViewType[];
  loading: boolean;
  error: boolean;
};

export type AllOwnersStateType = {
  data: null | OwnerType[];
  loading: boolean;
  error: boolean;
};

export type OwnerStateTpe = {
  data: null | OwnerWithPropertiesType;
  message: string;
  success: boolean;
  error: boolean;
  loading: boolean;
  purged: boolean;
};

export type ClientStateType = {
  valid: null | boolean;
  data: null | UserType;
  message: string;
  success: boolean;
  error: boolean;
};

export type FilterStateType = {
  searchBy: string;
  sortBy: string;
  direction: number;
  page: number;
};

//types which have added or computed fields i.e. joins from other collections

export type MyReservationViewType = ReservationType & {
  property: PropertyType;
  checkOut: string;
  bill: number;
};

export type OwnerWithPropertiesType = Omit<OwnerType, "properties"> & {
  properties: PropertyType[];
};

//types which exactly as they appear in mongodb

export type ReservationType = {
  _id: string;
  startDate: string;
  nights: number;
  propertyId: string;
  userId: string;
  createdDate: string;
};

export type OwnerType = {
  _id: string;
  languages: string[];
  properties: string[];
  firstName: string;
  lastName: string;
  biography: string;
};

export type PropertyType = {
  _id: string;
  location: string;
  title: string;
  description: string;
  buildDate: string;
  nightlyRate: number;
  rooms: number;
  owners: string[];
  category: "cottage" | "apartment" | "house" | "hut";
};

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  joinDate: string;
  isAdmin: boolean;
};
