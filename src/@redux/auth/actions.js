import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import {
  updateCurrentUserApi,
  // getCurrentUserApi,
  resetPasswordApi,
  forgotPasswordApi,
  registerApi,
  registerWithTokenApi,
  getPermissionsApi,
  subscribeUserApi,
  changePasswordApi,
} from 'api/user';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// import api
import { apiWrapper } from 'utils/reduxUtils';

export const login = createAsyncThunk(
  'auth/login',
  async (payload, thunkAPI) => {
    try {

      const response = await firebase.auth().signInWithEmailAndPassword(
        payload?.email,
        payload?.password,
      );
      const idToken = await response.user.getIdTokenResult(true)
      localStorage.setItem('sessionEmail', idToken.claims.email);
      const data = await (thunkAPI.dispatch(getCurrentUser()))
      
      if (data?.payload?.role === 'admin') {
        
        localStorage.setItem('sessionEmail', idToken.claims.email);
        localStorage.setItem('sessionToken', idToken.token);
        thunkAPI.dispatch(getCurrentUser());
        return response;
      }
      notification.error({
        message: 'OOps',
        description: "You don't have permission!",
      });
      return thunkAPI.rejectWithValue(data);
    } catch (error) {
      notification.error({
        message: 'OOps',
        description: error.message,
      });
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(
        {
          isShowLoading: true,
          isShowSuccessNoti: false,
        },
        registerApi,
        payload,
      );

      if (response.accessToken) {
        localStorage.setItem('sessionToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('fullName', response.user?.email);
        localStorage.setItem('userId', response.user?.id);
        thunkAPI.dispatch(getCurrentUser());
        return response.user;
      }
      return thunkAPI.rejectWithValue();
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const registerWithToken = createAsyncThunk(
  'auth/registerWithToken',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(
        {
          isShowLoading: true,
          isShowSuccessNoti: false,
        },
        registerWithTokenApi,
        payload,
      );

      if (response.token) {
        localStorage.setItem('sessionToken', response.token);
        thunkAPI.dispatch(getCurrentUser());
        return response;
      }
      return thunkAPI.rejectWithValue();
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (payload, thunkAPI) => {
    try {
      return firebase.firestore().collection('account').where('gmail', '==', localStorage.getItem('sessionEmail'))
        .get()
        .then(query => query.docs[0].data())
      // eslint-disable-next-linea
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (payload, thunkAPI) => {
    try {
      firebase.auth().signOut().then(() => {
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('refreshToken');
        
        localStorage.removeItem('fullName');
        localStorage.removeItem('userId');
        window.location.href = '/';
      });
      return {};
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const updateCurrentUser = createAsyncThunk(
  'auth/updateCurrentUser',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(null, updateCurrentUserApi, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper({isShowSuccessNoti: true}, forgotPasswordApi, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper({ isShowSuccessNoti: true }, resetPasswordApi, payload);
      if (response) {
        return response;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const subscribeUser = createAsyncThunk(
  'auth/subscribeUser',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(null, subscribeUserApi, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const getPermissions = createAsyncThunk(
  'auth/getPermissions',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(null, getPermissionsApi, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(
        {
          isShowLoading: true,
          isShowSuccessNoti: true,
        },
        changePasswordApi,
        payload,
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);
