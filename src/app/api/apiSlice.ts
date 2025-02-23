import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TagTypesEnum } from '../../types/types';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  credentials: 'include',
  prepareHeaders: (headers) => {
    const lang = localStorage.getItem('lang') || 'en'; // Get language from storage
    headers.set('x-language', lang);
    return headers;
  },
});

const apiSlice = createApi({
  baseQuery,

  tagTypes: [TagTypesEnum.Records, TagTypesEnum.Auth],
  endpoints: () => ({}),
});

export default apiSlice;
