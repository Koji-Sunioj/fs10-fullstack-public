export type AppType = {
  googleAuth: ApiType & GoogleType;
  client: ApiType & ClientType;
  property: ApiType & PropertyType;
  filterBy: ApiType & FilterType;
};

export type ApiType = {
  data?: null | ClientType | PropertyType;
  loading?: boolean;
  message?: string;
  success?: boolean;
  error: boolean;
  count?: null;
};

export type GoogleType = {
  jwt: null | string;
  user: null | string;
};

export type ClientType = {
  valid: null | boolean;
  data: null | {
    isAdmin: boolean;
    _id: string;
  };
};

export type FilterType = {
  searchBy: string;
  sortBy: string;
  direction: number;
  page: number;
};

export type OwnerType = {
  _id?: string;
  languages: string[];
  properties: string[];
  firstName: string;
  lastName: string;
  biography: string;
};

export type ReservationType = {
  startDate: string;
  nights: number;
  propertyId: string;
};

export type PropertyType = {
  _id?: string;
  location: string;
  title: string;
  description: string;
  buildDate: Date;
  nightlyRate: number;
  rooms: number;
  owners: string[];
  category: "cottage" | "apartment" | "house" | "hut";
};

export type PropertyState = {
  data: PropertyType[] | null;
  loading: boolean;
  error: boolean;
  count: number | null;
};

export type AppState = {
  filterBy: FilterType;
  properties: PropertyState;
  property: {
    loading: boolean;
    data: {}[];
  };
};
