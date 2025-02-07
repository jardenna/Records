import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TagTypesEnum } from '../../types/types';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  credentials: 'include',
});

const apiSlice = createApi({
  baseQuery,
  tagTypes: [TagTypesEnum.Records, TagTypesEnum.Auth],
  endpoints: () => ({}),
});

export default apiSlice;
