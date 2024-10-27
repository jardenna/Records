import apiSlice from '../../app/api/apiSlice';
import endpoints from '../../app/endpoints';

export const recordsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecords: builder.query<any, void>({
      query: () => endpoints.records,
      transformResponse: (responseData: any[]) => {
        const records = responseData.map(({ _id, ...rest }: any) => ({
          id: _id,
          ...rest,
        }));
        return records;
      },
    }),
  }),
});

export const { useGetAllRecordsQuery } = recordsApiSlice;
