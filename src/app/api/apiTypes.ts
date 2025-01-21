export interface FirstSixRecordsResponse {
  results: Records[];
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type OmittedRecordRequest = Omit<Records, 'id'>;
export type OmittedCreateAlbumRequest = Omit<
  UpdateAlbumRequest,
  'id' | 'imgUpdated'
>;

export interface UpdateAlbumRequest {
  file: File | null;
  fileName: string;
  id: string;
  imgUpdated: boolean;
  records: Records;
}

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

export interface Records {
  artist: string;
  cover: string;
  id: string;
  info: string;
  label: string;
  numOfRecords: number;
  origin: string;
  price: string;
  prodYear: string;
  recordNo: string;
  released: string;
  title: string;
}

export interface RecordsResponse {
  next: RecordsRequest;
  previous: RecordsRequest;
  recordsCount: number;
  results: Records[];
}
