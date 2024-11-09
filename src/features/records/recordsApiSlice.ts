import apiSlice from '../../app/api/apiSlice';
import { Pagination, RecordsResponse } from '../../app/api/apiTypes';
import transformId from '../../app/api/transformResponse';
import endpoints from '../../app/endpoints';

export const recordsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAmountOfRecords: builder.query<any, void>({
      query: () => `${endpoints.records}/amount`,
    }),
    getPaginatedRecords: builder.query<RecordsResponse, Pagination>({
      query: ({ page, limit }) =>
        `${endpoints.records}?page=${page}&limit=${limit}`,
      transformResponse: (responseData: any) => transformId(responseData),
      providesTags: ['Records'],
    }),
  }),
});

export const { useGetPaginatedRecordsQuery, useGetAmountOfRecordsQuery } =
  recordsApiSlice;
