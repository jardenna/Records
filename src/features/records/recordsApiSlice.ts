import apiSlice from '../../app/api/apiSlice';
import {
  AmountRecordsResponse,
  OmittedRecordRequest,
  Pagination,
  Records,
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
      transformResponse: (responseData: Records[]) => transformId(responseData),
      providesTags: ['Records'],
    }),
    getRecordById: builder.query<Records, string | undefined>({
      query: (id) => `${endpoints.records}/${id}`,
      providesTags: ['Records'],
    }),
    createNewRecord: builder.mutation<Records, OmittedRecordRequest>({
      query: (record) => ({
        url: `/${endpoints.records}`,
        method: 'POST',
        body: record,
      }),
      invalidatesTags: ['Records'],
    }),
    updateRecord: builder.mutation<Records, { id: string; record: Records }>({
      query: ({ id, record }) => ({
        url: `/${endpoints.records}/${id}`,
        method: 'PUT',
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
  useUpdateRecordMutation,
} = recordsApiSlice;
