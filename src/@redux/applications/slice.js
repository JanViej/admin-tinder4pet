import { createSlice } from '@reduxjs/toolkit';
import {
  getApplications,
} from './actions';

export const initialState = {
  data: [],
  loading: false,
};

const { reducer } = createSlice({
  name: 'Applications',
  initialState,
  reducers: {},
  extraReducers: {
    [getApplications.pending]: (state) => {
      state.loading = true;
    },
    [getApplications.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
    },
    [getApplications.rejected]: (state) => {
      state.loading = false;
    },
    // [disableUser.fulfilled]: (state, { payload }) => {
    //   state.data = state.data.map(item => item.id === payload.id ? ({
    //     ...item,
    //     ...payload
    //   }) : item)
    // }
  },
});

export default reducer;
