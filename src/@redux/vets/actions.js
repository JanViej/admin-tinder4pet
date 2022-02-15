import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';

import firebase from 'firebase/app';
import 'firebase/firestore';

export const getVets = createAsyncThunk(
  'vets/getVets',
  async (payload, thunkAPI) => {
    try {
      return firebase.firestore().collection('vets')
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

export const disableVet = createAsyncThunk(
  'vets/disableVet',
  async (payload, thunkAPI) => {
    try {
      await firebase.firestore().collection('vets').doc(payload.id)
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

export const addVet = createAsyncThunk(
  'vets/addVet',
  async (payload, thunkAPI) => {
    try {
      const res = await firebase.firestore().collection('vets').add({
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