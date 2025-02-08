import apiSlice from '../../app/api/apiSlice';
import {
  AuthResponse,
  OmittedLogoutResponse,
  OmittedRegisterRequest,
  UserRequest,
} from '../../app/api/apiTypes';
import authEndpoints from '../../app/authEndpoints';
import { TagTypesEnum } from '../../types/types';
import { logout } from './authSlice';

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
    sendLogout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(logout());
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
      },
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
  useSendLogoutMutation,
} = authApiSlice;
