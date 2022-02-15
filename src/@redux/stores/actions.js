import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';

import firebase from 'firebase/app';
import 'firebase/firestore';

export const getStores = createAsyncThunk(
  'stores/getStores',
  async (payload, thunkAPI) => {
    try {
      return firebase.firestore().collection('stores')
        .get()
        .then(query => query.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          key: doc.id,
        })))
    } catch (error) {
      notification.error({
        message: 'OOps',
        description: error.message,
      });
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const disableStore = createAsyncThunk(
  'stores/disableStore',
  async (payload, thunkAPI) => {
    try {
      await firebase.firestore().collection('stores').doc(payload.id)
        .update({
          isActive: payload.isActive,
        })
      return payload;
    } catch (error) {
      notification.error({
        message: 'OOps',
        description: error.message,
      });
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const addStore = createAsyncThunk(
  'stores/addStore',
  async (payload, thunkAPI) => {
    try {
      const res = await firebase.firestore().collection('stores').add({
        ...payload,
      });
      return res
    } catch (error) {
      notification.error({
        message: 'OOps',
        description: error.message,
      });
      return thunkAPI.rejectWithValue(error);
    }
  },
);


