import { combineReducers } from '@reduxjs/toolkit';

import userReducer from '../features/slices/userSlice';
import { apiQuery } from '@/features/api/jobsApi';
import { authApiSlice } from '@/features/api/authApi';

const rootReducer = combineReducers({
  User: userReducer,
  [apiQuery.reducerPath]: apiQuery.reducer,
  [authApiSlice.reducerPath]: authApiSlice.reducer,
});

export default rootReducer;
