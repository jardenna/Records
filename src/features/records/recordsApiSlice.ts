import apiSlice from '../../app/api/apiSlice';
import transformId from '../../app/api/transformResponse';
import endpoints from '../../app/endpoints';

export const recordsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecords: builder.query<any, any>({
      query: ({ pageNo, limit }) =>
        `${endpoints.records}?page=${pageNo}&limit=${limit}`,
      transformResponse: (responseData: any) => transformId(responseData),
    }),
  }),
});

export const { useGetAllRecordsQuery } = recordsApiSlice;
