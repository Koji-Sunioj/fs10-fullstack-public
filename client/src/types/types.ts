export type AppType = {
  googleAuth: GoogleType;
  client: ClientType;
  property: FetchPropertyType;
  filterBy: FilterType;
  getAllProperties: FetchPropertiesType;
  addOwner: CreateOwnerType;
  owner: FetchOwnerType;
  owners: FetchOwnersType;
  createProperty: CreateOwnerType;
  updateOwner: UpdateType;
  updateProperty: UpdateType;
  properties: FetchPropertiesQueryType;
  updateUser: UpdateType;
  deleteOwner: UpdateType;
  createReservation: UpdateType & { loading: boolean };
  deleteReservation: UpdateType;
  deleteProperty: UpdateType;
  reservationView: FetchReservationsType;
};

export type UpdateType = {
  message: string;
  success: boolean;
  error: boolean;
};

export type CreateOwnerType = {
  data: null | OwnerType;
  error: boolean;
  success: boolean;
  message: string;
};

export type FetchPropertiesType = {
  data: null | PropertyType[];
  loading: boolean;
  error: boolean;
};

export type FetchReservationViewType = {
  data: null | ReservationType[];
  loading: boolean;
  error: boolean;
};

export type FetchPropertyType = {
  data:
    | null
    | (Omit<PropertyType, "owners"> & {
        properties: PropertyType[];
        owners: OwnerType[];
      });
  loading: boolean;
  error: boolean;
};

export type JoinFetchPropertyType = {};

export type FetchPropertiesQueryType = {
  data: null | PropertyType[];
  loading: boolean;
  error: boolean;
  count: null | number;
};

export type FetchReservationsType = {
  data: null | PropertyReservationView[];
  loading: boolean;
  error: boolean;
};

export type FetchOwnerType = {
  data: null | OwnerWithPropertiesType;
  loading: boolean;
  error: boolean;
};

export type FetchOwnersType = {
  data: null | OwnerType[];
  loading: boolean;
  error: boolean;
};

export type GoogleType = {
  jwt: null | string;
  user: null | string;
};

export type ClientType = {
  valid: null | boolean;
  data: null | UserType;
};

export type FilterType = {
  searchBy: string;
  sortBy: string;
  direction: number;
  page: number;
};

export type ReservationType = {
  startDate: string;
  nights: number;
  propertyId: string;
};

export type PropertyReservationView = {
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

export type OwnerWithPropertiesType = {
  _id: string;
  languages: string[];
  properties: PropertyType[];
  firstName: string;
  lastName: string;
  biography: string;
};

export type PropertyType = {
  _id: string;
  location: string;
  title: string;
  description: string;
  buildDate: Date;
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
