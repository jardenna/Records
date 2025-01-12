import apiSlice from '../../app/api/apiSlice';
import {
  Records,
  RecordsRequest,
  RecordsResponse,
} from '../../app/api/apiTypes';
import transformId from '../../app/api/transformResponse';
import endpoints from '../../app/endpoints';

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
      transformResponse: (responseData: Records[]) => transformId(responseData),
      providesTags: ['Records'],
    }),
    getRecordById: builder.query<Records, string | undefined>({
      query: (id) => `${endpoints.records}/${id}`,
      providesTags: ['Records'],
    }),
    createNewRecord: builder.mutation<Records, any>({
      query: ({ records, file, fileName }) => {
        if (file && fileName) {
          const fd = new FormData();
          fd.append(fileName, file);

          Object.keys(records).forEach((key) => {
            fd.append(key, records[key as keyof Records] as string);
          });

          return {
            url: `/${endpoints.records}`,
            method: 'POST',
            body: fd,
          };
        }
        return {
          url: `/${endpoints.records}`,
          method: 'POST',
          body: records,
        };
      },
      invalidatesTags: ['Records'],
    }),
    updateRecord: builder.mutation<Records, any>({
      query: ({ id, records, imgUpdated, file, fileName }) => {
        if (imgUpdated && file && fileName) {
          const fd = new FormData();
          fd.append(fileName, file);

          Object.keys(records).forEach((key) => {
            fd.append(key, records[key as keyof Records] as string);
          });

          return {
            url: `/${endpoints.records}/${id}`,
            method: 'POST',
            body: fd,
          };
        }
        if (!id) {
          return {
            url: `/${endpoints.records}`,
            method: 'POST',
            body: records,
          };
        }
        return {
          url: `/${endpoints.records}/${id}`,
          method: 'PUT',
          body: records,
        };
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
  useCreateNewRecordMutation,
  useUpdateRecordMutation,
  useDeleteRecordMutation,
} = recordsApiSlice;
