import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLogin, userLogout } from '../slices/userSlice';

const URL = 'http://localhost:8080/api/user';
export const authApiSlice = createApi({
  reducerPath: 'Auth',
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (inputData) => ({
        url: '/',
        method: 'POST',
        body: inputData,
      }),
    }),
    signIn: builder.mutation({
      query: (inputData) => ({
        url: '/login',
        method: 'POST',
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLogin(result?.data?.user));
        } catch (e) {
          console.log('Error Inside AuthApi While Logging In User --->', e);
        }
      },
    }),
    onBoard: builder.mutation({
      query: ({ inputData, id }) => ({
        url: `/onBoard/${id}`,
        method: 'PUT',
        body: inputData,
      }),
    }),
    loadUser: builder.query({
      query: () => ({
        url: '/profile',
        method: 'GET',
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLogin(result?.data?.user));
        } catch (e) {
          console.log('AUTH API ERROR WHILE LOADING USER', e);
        }
      },
    }),

    getUserAllJobs: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
    }),
    updateUser: builder.mutation({
      query: ({ inputData, id }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLogin(result?.data?.user));
        } catch (e) {
          console.log('Error While Updating User Form AUTH API', e);
        }
      },
    }),
    updateExp: builder.mutation({
      query: ({ inputData, id }) => ({
        url: `/${id}/exp`,
        method: 'PUT',
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLogin(result?.data?.user));
        } catch (e) {
          console.log('Error While Updating User Form AUTH API', e);
        }
      },
    }),
    getProfile: builder.query({
      query: (id) => ({
        url: `/profile/${id}`,
        method: 'GET',
      }),
    }),
    withdrawApplication: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/${id}/job/${userId}`,
        method: 'PUT',
      }),
    }),
    userLogout: builder.mutation({
      query: () => ({
        url: `/logout`,
        method: 'GET',
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLogout());
        } catch (e) {
          console.log('Error While Logging Out', e);
        }
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useOnBoardMutation,
  useUpdateUserMutation,
  useUpdateExpMutation,
  useGetProfileQuery,
  useUserLogoutMutation,
  useGetUserAllJobsQuery,
  useWithdrawApplicationMutation,
} = authApiSlice;
