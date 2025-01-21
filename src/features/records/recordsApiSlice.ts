import apiSlice from '../../app/api/apiSlice';
import {
  AlbumCoverRequest,
  Records,
  RecordsRequest,
  RecordsResponse,
} from '../../app/api/apiTypes';
import transformId from '../../app/api/transformResponse';
import endpoints from '../../app/endpoints';
import { createFormData, createQueryOptions } from './utils';

export const recordsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFirstSixRecords: builder.query<any, void>({
      query: () => `${endpoints.firstSix}`,
      transformResponse: (responseData: Records[]) => transformId(responseData),
      providesTags: ['Records'],
    }),
    getPaginatedRecords: builder.query<RecordsResponse, RecordsRequest>({
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
      }: RecordsRequest) => {
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
      transformResponse: (responseData: any) => transformId(responseData),
      providesTags: ['Records'],
    }),
    getRecordById: builder.query<Records, string | undefined>({
      query: (id) => `${endpoints.records}/${id}`,
      providesTags: ['Records'],
    }),
    createNewRecord: builder.mutation<Records, AlbumCoverRequest>({
      query: ({ records, file, fileName }) =>
        createQueryOptions(
          `/${endpoints.records}`,
          'POST',
          createFormData(records, file, fileName),
        ),
      invalidatesTags: ['Records'],
    }),
    updateRecord: builder.mutation<Records, AlbumCoverRequest>({
      query: ({ id, records, imgUpdated, file, fileName }) =>
        createQueryOptions(
          `/${endpoints.records}/${id}`,
          imgUpdated && file && fileName ? 'POST' : 'PUT',
          createFormData(records, file, fileName),
        ),
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
  useGetFirstSixRecordsQuery,
  useGetPaginatedRecordsQuery,
  useGetRecordByIdQuery,
  useCreateNewRecordMutation,
  useUpdateRecordMutation,
  useDeleteRecordMutation,
} = recordsApiSlice;
