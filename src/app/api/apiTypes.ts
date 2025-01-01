export interface Records {
  artist: string;
  id: string;
  label: string;
  numOfRecords: number;
  prodYear: string;
  recordNo: string;
  title: string;
  cover?: string;
  info?: string;
  origin?: string;
  price?: string;
  released?: string;
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
