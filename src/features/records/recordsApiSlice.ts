import apiSlice from '../../app/api/apiSlice';
import {
  FirstSixRecordsResponse,
  Records,
  RecordsRequest,
  RecordsResponse,
  UpdateAlbumRequest,
} from '../../app/api/apiTypes';
import transformId from '../../app/api/transformResponse';
import endpoints from '../../app/endpoints';
import { createFormData, createQueryOptions } from './utils';

export const recordsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFirstSixRecords: builder.query<FirstSixRecordsResponse, void>({
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
      transformResponse: (responseData: Records[]) => transformId(responseData),
      providesTags: ['Records'],
    }),
    getRecordById: builder.query<Records, string | undefined>({
      query: (id) => `${endpoints.records}/${id}`,
      providesTags: ['Records'],
    }),

    recordMutation: builder.mutation<Records, UpdateAlbumRequest>({
      query: ({ id, records, file, fileName }) => {
        const url = id
          ? `/${endpoints.records}/${id}`
          : `/${endpoints.records}`;
        return createQueryOptions(
          url,
          'POST',
          createFormData(records, file || undefined, fileName),
        );
      },
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
  useRecordMutationMutation,
  useDeleteRecordMutation,
} = recordsApiSlice;
