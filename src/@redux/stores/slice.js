import { createSlice } from '@reduxjs/toolkit';
import {
  getStores,
  disableStore,
} from './actions';

export const initialState = {
  data: [],
  loading: false,
};

const { reducer } = createSlice({
  name: 'Stores',
  initialState,
  reducers: {},
  extraReducers: {
    [getStores.pending]: (state) => {
      state.loading = true;
    },
    [getStores.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
    },
    [getStores.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [disableStore.fulfilled]: (state, { payload }) => {
      state.data = state.data.map(item => item.id === payload.id ? ({
        ...item,
        ...payload,
      }) : item)
    },
  },
});

export default reducer;
