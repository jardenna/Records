export interface Records {
  artist: string;
  id: string;
  info: string;
  label: string;
  numOfRecords: number;
  price: string;
  prodYear: string;
  recordNo: string;
  released: string;
  title: string;
  cover?: string;
  origin?: string;
  photo?: any;
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type OmittedRecordRequest = Omit<Records, 'id'>;

export interface RecordsRequest {
  artist: string;
  label: string;
  limit: number;
  origin: string;
  page: number;
  prodYear: string;
  sortField: string;
  sortOrder: SortOrder;
  title: string;
}

export interface RecordsResponse {
  next: RecordsRequest;
  previous: RecordsRequest;
  recordsCount: number;
  results: Records[];
}
