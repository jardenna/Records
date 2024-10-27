/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import apiSlice from '../../app/api/apiSlice';
import endpoints from '../../app/endpoints';

export const recordsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecords: builder.query<any, void>({
      query: () => `${endpoints.records}?page=2&limit=5`,
      transformResponse: (responseData: any) => {
        function transformId(data: any) {
          data.results.forEach((result: any) => {
            result.id = result._id;
            delete result._id;
          });
          return data;
        }

        const transformedData = transformId(responseData);

        return transformedData;
      },
    }),
  }),
});

export const { useGetAllRecordsQuery } = recordsApiSlice;
