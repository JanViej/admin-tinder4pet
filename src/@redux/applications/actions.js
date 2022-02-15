/*eslint-disable*/
import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { addStore } from '@redux/stores/actions';
import { addVet } from '@redux/vets/actions';
import firebase from 'firebase/app';
import 'firebase/firestore';

export const getApplications = createAsyncThunk(
  'applications/getApplications',
  async (payload, thunkAPI) => {
    try {
      return firebase
        .firestore()
        .collection('applications')
        .get()
        .then((query) =>
          query.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            key: doc.id,
          })),
        );
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
  'applications/disableUser',
  async (payload, thunkAPI) => {
    try {
      await firebase
        .firestore()
        .collection('applications')
        .doc(payload.id)
        .update({
          isActive: payload.isActive,
        });
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

export const acceptForm = createAsyncThunk(
  'applications/acceptForm',
  async (payload, thunkAPI) => {
    try {
      await firebase
        .firestore()
        .collection('applications')
        .doc(payload.id)
        .update({
          status: 'ACCEPTED',
        });
      if(payload?.type === 'VET') {
        thunkAPI.dispatch(addVet(payload.data))
      }
      else thunkAPI.dispatch(addStore(payload.data))
      return {
        ...payload,
        status: 'ACCEPTED',
      };
    } catch (error) {
      notification.error({
        message: 'OOps',
        description: error.message,
      });
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const denyForm = createAsyncThunk(
  'applications/denyForm',
  async (payload, thunkAPI) => {
    try {
      await firebase
        .firestore()
        .collection('applications')
        .doc(payload.id)
        .update({
          status: 'REJECTED',
        });
        return {
          ...payload,
          status: 'REJECTED',
        };
    } catch (error) {
      notification.error({
        message: 'OOps',
        description: error.message,
      });
      return thunkAPI.rejectWithValue(error);
    }
  },
);