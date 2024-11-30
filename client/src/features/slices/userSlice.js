import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  user: null,
};
const userSlicer = createSlice({
  name: 'User',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.user = action.payload;
    },
    userLogout: (state) => {
      state.user = null;
    },
  },
});

export const { userLogin, userLogout } = userSlicer.actions;
export default userSlicer.reducer;
