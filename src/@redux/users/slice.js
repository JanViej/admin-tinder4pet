/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import {
  getUsers,
  disableUser
} from './actions';

export const initialState = {
  data: [],
  loading: false,
};

const { reducer } = createSlice({
  name: 'Auth',
  initialState,
  reducers: {},
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
    },
    [getUsers.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [disableUser.fulfilled]: (state, { payload }) => {
      state.data = state.data.map(item => item.id === payload.id ? ({
        ...item,
        ...payload
      }) : item)
    }
  },
});

export default reducer;
