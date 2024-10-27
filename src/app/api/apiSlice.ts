import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' });

const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Records'],
  endpoints: () => ({}),
});

export default apiSlice;
