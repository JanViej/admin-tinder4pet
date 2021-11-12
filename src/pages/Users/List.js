/* eslint-disable */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, disableUser } from '@redux/users/actions';
import { Breadcrumb, Table, Space, Avatar, Divider, Switch } from 'antd';
import { Link } from 'react-router-dom';
import i18next from 'i18next';
import { MaleIcon, FemaleIcon } from 'components/SVGIcon';
import PageTitle from 'components/common/PageTitle';
import HomeWrapper from './styles';

const Home = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.data);
  const loading = useSelector(state => state.users.loading);

  console.log('asdasd users', users)

  const columns = [
    {
      title: 'Pet',
      dataIndex: 'petName',
      key: 'petName',
      render: (text, row) => (
        <Space style={{ display: 'flex', alignItems: 'center'}}>
          <Avatar src={row.avatar} size={56} />
          <b>
            {text}
            {' '}
            {row.petGender === 'male' && (
              <MaleIcon />
            )}
            {row.petGender === 'female' && (
              <FemaleIcon />
            )}
          </b>
        </Space>
      ),
    },
    {
      title: 'Breed',
      dataIndex: 'breed',
      key: 'breed',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Owner',
      dataIndex: 'ownerName',
      key: 'ownerName',
      render: (ownerName, row) => (
        <div>
          <b>{ownerName}</b>
          <div>{row.gmail}</div>
          <div>{row.phoneNumber}</div>
        </div>
      )
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive, row) => (
        <Switch checked={isActive} onChange={checked => dispatch(disableUser({
          id: row.id,
          isActive: checked,
        }))} />
      )
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      render: (text, record) => (
        <Space size="middle">
          <a>View</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getUsers());
    // eslint-disable-next-line
  }, []);
  return (
    <HomeWrapper>
      <PageTitle className="breadcrumb-section">
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            <Link to="/users">
              <h1>{i18next.t('users.header')}</h1>
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </PageTitle>
      <Divider />
      <Table columns={columns} loading={loading} dataSource={users} />
    </HomeWrapper>
  );
};

Home.propTypes = {};

export default Home;
