import apiSlice from '../../app/api/apiSlice';
import { AuthResponse, UserRequest } from '../../app/api/apiTypes';
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
  }),
});

export const { useRegisterMutation } = authApiSlice;
