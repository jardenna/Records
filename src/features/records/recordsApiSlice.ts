import apiSlice from '../../app/api/apiSlice';
import { Pagination, RecordsResponse } from '../../app/api/apiTypes';
import transformId from '../../app/api/transformResponse';
import endpoints from '../../app/endpoints';

export const recordsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPaginatedRecords: builder.query<RecordsResponse, Pagination>({
      query: ({ pageNo, limit }) =>
        `${endpoints.records}?page=${pageNo}&limit=${limit}`,
      transformResponse: (responseData: any) => transformId(responseData),
      providesTags: ['Records'],
    }),
  }),
});

export const { useGetPaginatedRecordsQuery } = recordsApiSlice;
