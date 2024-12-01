import apiSlice from '../../app/api/apiSlice';
import {
  AmountRecordsResponse,
  OmittedRecordRequest,
  Pagination,
  Record,
  RecordsResponse,
} from '../../app/api/apiTypes';
import transformId from '../../app/api/transformResponse';
import endpoints from '../../app/endpoints';

export const recordsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAmountOfRecords: builder.query<AmountRecordsResponse, void>({
      query: () => `${endpoints.records}/amount`,
    }),
    getPaginatedRecords: builder.query<RecordsResponse, Pagination>({
      query: ({ page, limit }) =>
        `${endpoints.records}?page=${page}&limit=${limit}`,
      transformResponse: (responseData: Record[]) => transformId(responseData),
      providesTags: ['Records'],
    }),
    getRecordById: builder.query<Record, string | undefined>({
      query: (id) => `${endpoints.records}/${id}`,
      providesTags: ['Records'],
    }),
    createNewRecord: builder.mutation<Record, OmittedRecordRequest>({
      query: (record) => ({
        url: `/${endpoints.records}`,
        method: 'POST',
        body: record,
      }),
      invalidatesTags: ['Records'],
    }),
  }),
});

export const {
  useGetPaginatedRecordsQuery,
  useGetAmountOfRecordsQuery,
  useGetRecordByIdQuery,
  useCreateNewRecordMutation,
} = recordsApiSlice;
