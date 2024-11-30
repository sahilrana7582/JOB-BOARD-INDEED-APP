import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = 'https://job-board-indeed-app.onrender.com/api/job';
export const apiQuery = createApi({
  reducerPath: 'Jobs',
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: (id = '') => ({
        url: `/${id}`,
        method: 'GET',
      }),
    }),
    postJob: builder.mutation({
      query: (inputData) => ({
        url: '/',
        method: 'POST',
        body: inputData,
      }),
    }),
    applyJob: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/${id}/apply/${userId}`,
        method: 'PUT',
      }),
    }),
    selectApplication: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/${id}/apply/${userId}`,
        method: 'PATCH',
      }),
    }),
    editJob: builder.mutation({
      query: ({ id, inputData }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: inputData,
      }),
    }),

    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),

    getJobById: builder.query({
      query: (jobId) => ({
        url: `applications/${jobId}`,
        method: 'GET',
      }),
    }),

    rejectApplication: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/${id}/apply/${userId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  usePostJobMutation,
  useApplyJobMutation,
  useGetJobByIdQuery,
  useRejectApplicationMutation,
  useEditJobMutation,
  useDeleteJobMutation,
  useSelectApplicationMutation,
} = apiQuery;
