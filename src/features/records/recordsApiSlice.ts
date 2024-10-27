import apiSlice from '../../app/api/apiSlice';

export const recordsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecords: builder.query<any, void>({
      query: () => '/firstSix',
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
