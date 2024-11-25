export interface User {
  firstName: string;
  email: string;
  lastName: string;
  message: string;
}

export interface BookInterface {
  p: string;
  startIndex: number;
  maxResults: number;
}

export interface StateInterface {
  loading: boolean;
  totalItems: number;
  books: {}[];
  mostCommonAuthor: string;
  earliestDate: string;
  latestDate: string;
  serverResponseTime: string;
}
