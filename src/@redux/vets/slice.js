import { createSlice } from '@reduxjs/toolkit';
import {
  getVets,
  disableVet,
} from './actions';

export const initialState = {
  data: [],
  loading: false,
};

const { reducer } = createSlice({
  name: 'Vets',
  initialState,
  reducers: {},
  extraReducers: {
    [getVets.pending]: (state) => {
      state.loading = true;
    },
    [getVets.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
    },
    [getVets.rejected]: (state) => {
      state.loading = false;
    },
    [disableVet.fulfilled]: (state, { payload }) => {
      state.data = state.data.map(item => item.id === payload.id ? ({
        ...item,
        ...payload,
      }) : item)
    },
  },
});

export default reducer;
