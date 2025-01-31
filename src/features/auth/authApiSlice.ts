import apiSlice from '../../app/api/apiSlice';
import {
  AuthResponse,
  OmittedRegisterRequest,
  UserRequest,
} from '../../app/api/apiTypes';
import authEndpoints from '../../app/authEndpoints';

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
    }),
    checkAuth: builder.query<AuthResponse, void>({
      query: () => authEndpoints.checkAuth,
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useCheckAuthQuery } =
  authApiSlice;
