import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLoading: false,
};

const { actions, reducer } = createSlice({
  name: 'Loading',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const { setLoading } = actions;
export default reducer;
