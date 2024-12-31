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

export interface Pagination {
  artist: any;
  limit: number;
  page: number;
  sortField: string;
  sortOrder: SortOrder;
  title: any;
}

export interface RecordsResponse {
  next: Pagination;
  previous: Pagination;
  recordsCount: number;
  results: Records[];
}
