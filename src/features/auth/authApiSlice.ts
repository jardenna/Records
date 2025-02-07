import apiSlice from '../../app/api/apiSlice';
import {
  AuthResponse,
  OmittedLogoutResponse,
  OmittedRegisterRequest,
  UserRequest,
} from '../../app/api/apiTypes';
import authEndpoints from '../../app/authEndpoints';
import { TagTypesEnum } from '../../types/types';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, UserRequest>({
      query: (user) => ({
        url: authEndpoints.register,
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation<AuthResponse, OmittedRegisterRequest>({
      query: (user) => ({
        url: authEndpoints.login,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: [TagTypesEnum.Auth],
    }),
    logout: builder.mutation<OmittedLogoutResponse, void>({
      query: () => ({
        url: authEndpoints.logout,
        method: 'POST',
      }),
      invalidatesTags: [TagTypesEnum.Auth],
    }),
    checkAuth: builder.query<AuthResponse, void>({
      query: () => authEndpoints.checkAuth,
      providesTags: [TagTypesEnum.Auth],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useCheckAuthQuery,
  useLogoutMutation,
} = authApiSlice;
