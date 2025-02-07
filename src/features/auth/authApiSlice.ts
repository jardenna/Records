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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(apiSlice.util.invalidateTags([TagTypesEnum.Auth])); // Invaliderer checkAuth
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
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
