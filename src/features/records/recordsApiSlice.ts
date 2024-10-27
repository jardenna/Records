import apiSlice from '../../app/api/apiSlice';
import transformId from '../../app/api/transformResponse';
import endpoints from '../../app/endpoints';

export const recordsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecords: builder.query<any, void>({
      query: () => `${endpoints.records}?page=4&limit=2`,
      transformResponse: (responseData: any) => {
        const transformedData = transformId(responseData);

        return transformedData;
      },
    }),
  }),
});

export const { useGetAllRecordsQuery } = recordsApiSlice;
