export type AppType = {
  googleAuth: GoogleType;
  client: ClientType;
  property: PropertyStateType;
  filterBy: FilterType;
  getAllProperties: FetchPropertiesType;
  addOwner: CreateOwnerType;
  owner: FetchOwnerType;
  owners: FetchOwnersType;
  updateOwner: UpdateOwnerType;
  properties: FetchPropertiesQueryType;
  updateUser: UpdateType;
  deleteOwner: UpdateType;
  createReservation: UpdateType & { loading: boolean };
  deleteReservation: UpdateType;
  reservationView: FetchReservationsType;
  myReservations: FetchReservationsType;
  ownerModified: { modified: boolean };
};

export type UserViewType = {
  client: ClientType;
  children?: JSX.Element[];
};

export type OwnerFormType = {
  properties: FetchPropertiesType;
  owner?: OwnerWithPropertiesType;
  status: UpdateType;
  sendOwner: (owner: Omit<OwnerType, "_id">) => void;
};

export type PropertyFormType = {
  owners: FetchOwnersType;
  property?: Omit<PropertyType, "owners"> & {
    properties: PropertyType[];
    owners: OwnerType[];
  };
  sendProperty: (property: Omit<PropertyType, "_id">) => void;
  status: boolean;
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

export type UpdateOwnerType = {
  data: null | Partial<OwnerType>;
  error: boolean;
  success: boolean;
  message: string;
};

export type UpdatePropertyType = {
  data: null | Partial<PropertyType>;
  error: boolean;
  success: boolean;
  message: string;
};

export type CreatePropertyType = {
  data: null | Partial<PropertyType>;
  error: boolean;
  success: boolean;
  message: string;
};

export type CreateOwnerType = {
  data: null | Partial<OwnerType>;
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

export type FetchPropertiesQueryType = {
  data: null | PropertyType[];
  loading: boolean;
  error: boolean;
  count: null | number;
};

export type FetchReservationsType = {
  data: null | MyReservationViewType[];
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

export type MyReservationViewType = {
  _id: string;
  startDate: string;
  nights: number;
  propertyId: string;
  userId: string;
  createdDate: string;
  property: PropertyType;
  checkOut: string;
  bill: number;
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
