import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { apiQuery } from '@/features/api/jobsApi';
import { authApiSlice } from '@/features/api/authApi';

const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(apiQuery.middleware, authApiSlice.middleware),
});

const initializeApp = async () => {
  await appStore.dispatch(
    authApiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};
initializeApp();

export default appStore;
