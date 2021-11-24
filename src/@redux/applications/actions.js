import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';

import firebase from 'firebase/app';
import 'firebase/firestore';

export const getApplications = createAsyncThunk(
  'users/getApplications',
  async (payload, thunkAPI) => {
    try {
      return firebase.firestore().collection('applications')
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

export const disableUser = createAsyncThunk(
  'users/disableUser',
  async (payload, thunkAPI) => {
    try {
      await firebase.firestore().collection('applications').doc(payload.id)
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
