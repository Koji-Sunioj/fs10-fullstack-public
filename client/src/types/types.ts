export type FetchTYpe = {
  data: null;
  loading: boolean;
  error: boolean;
};

export type PostType = {
  data: null;
  message: string;
  success: boolean;
  error: boolean;
};

export type TokenType = {
  valid: null | boolean;
  data: null;
};

export type FilterType = {
  searchBy: string;
  sortBy: string;
  direction: number;
  page: number;
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
