export interface Record {
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

export type OmittedRecordRequest = Omit<Record, 'id'>;

export interface Pagination {
  limit: number;
  page: number;
}

export interface RecordsResponse {
  next: Pagination;
  previous: Pagination;
  recordsCount: number;
  results: Record[];
}

export interface AmountRecordsResponse {
  totalAmountRecords: number;
}
