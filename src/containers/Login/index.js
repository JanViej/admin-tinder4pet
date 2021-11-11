import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@redux/auth/actions';
import AuthLayout from 'layout/AuthLayout';
import SignInForm from './Form';

const SignIn = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const onSubmit = values => {
    dispatch(login({
      ...values,
      isNotAdminUrl: true,
    }));
  }
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <AuthLayout>
      <SignInForm onSubmit={onSubmit} loading={loading} />
    </AuthLayout>
  )
}

export default SignIn;
