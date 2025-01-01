import apiSlice from '../../app/api/apiSlice';
import {
  OmittedRecordRequest,
  Pagination,
  Records,
  RecordsResponse,
} from '../../app/api/apiTypes';
import transformId from '../../app/api/transformResponse';
import endpoints from '../../app/endpoints';

export const recordsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPaginatedRecords: builder.query<RecordsResponse, Pagination>({
      query: ({
        page,
        limit,
        sortField,
        sortOrder,
        artist,
        title,
        label,
        prodYear,
        origin,
      }: Pagination) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          sortField,
          sortOrder,
          artist: artist || '',
          title: title || '',
          label: label || '',
          prodYear: prodYear || '',
          origin: origin || '',
        });
        return `${endpoints.records}?${params.toString()}`;
      },
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
    deleteRecord: builder.mutation({
      query: (id) => ({
        url: `${endpoints.deleteRecord}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Records'],
    }),
  }),
});

export const {
  useGetPaginatedRecordsQuery,
  useGetRecordByIdQuery,
  useCreateNewRecordMutation,
  useUpdateRecordMutation,
  useDeleteRecordMutation,
} = recordsApiSlice;
