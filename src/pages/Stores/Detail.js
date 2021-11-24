/* eslint-disable */
import React from 'react';
import PageTitle from 'components/common/PageTitle';
import { useParams } from 'react-router-dom';
import {
  Breadcrumb,
  Table,
  Space,
  Avatar,
  Divider,
  Switch,
  Button,
} from 'antd';
import { Link } from 'react-router-dom';
import i18next from 'i18next';
import {DetailUserWrapper} from './styles';

const UserDetail = () => {
  const params = useParams();

  return (
    <DetailUserWrapper>
      <PageTitle className="breadcrumb-section">
        <Breadcrumb separator=">">
          <Breadcrumb.Item href="/users">Users Management</Breadcrumb.Item>
          <Breadcrumb.Item >User Detail</Breadcrumb.Item>
        </Breadcrumb>
      </PageTitle>
    </DetailUserWrapper>
  );
};

export default UserDetail;
