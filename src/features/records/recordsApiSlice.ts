import apiSlice from '../../app/api/apiSlice';

export const recordsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecords: builder.query<any, void>({
      query: () => 'records',
      transformResponse: (responseData: any[]) => {
        const records = responseData.map(({ _id, ...rest }: any) => ({
          id: _id,
          ...rest,
        }));
        // const sortedRecords = records.sort((a, b) => a.completed - b.completed);
        return records;
      },
    }),
  }),
});

export const { useGetAllRecordsQuery } = recordsApiSlice;
