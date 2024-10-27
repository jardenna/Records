import apiSlice from '../../app/api/apiSlice';
import transformId from '../../app/api/transformResponse';
import endpoints from '../../app/endpoints';

export const recordsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecords: builder.query<any, void>({
      query: () => `${endpoints.records}?page=11&limit=8`,
      transformResponse: (responseData: any) => transformId(responseData),
    }),
  }),
});

export const { useGetAllRecordsQuery } = recordsApiSlice;
