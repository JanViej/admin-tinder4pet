import { createSlice } from '@reduxjs/toolkit';
import {
  getApplications,
  acceptForm,
  denyForm,
} from './actions';

export const initialState = {
  data: [],
  loading: false,
};
 
export const { reducer, actions } = createSlice({
  name: 'Applications',
  initialState,
  reducers: {
    changeData: (state, payload) => {
      state.data = state.data.map(item => {
        if(item?.id === payload.id) return {
          ...item,
          status: payload.status,
        }
        return {...item}
      });
    },
  },
  extraReducers: {
    [getApplications.pending]: (state) => {
      state.loading = true;
    },
    [acceptForm.fulfilled]: (state, { payload }) => {
      state.data = state.data.map(item => {
        if (item?.id === payload.id) return {
          ...item,
          status: payload.status,
        }
        return {...item}
      });
    },
    [denyForm.fulfilled]: (state, { payload }) => {
      state.data = state.data.map(item => {
        if (item?.id === payload.id) return {
          ...item,
          status: payload.status,
        }
        return {...item}
      });
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
