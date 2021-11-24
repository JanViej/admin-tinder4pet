import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStores, disableStore } from '@redux/stores/actions';
import { Breadcrumb, Table, Space, Avatar, Divider, Switch, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import PageTitle from 'components/common/PageTitle';
import { useHistory } from 'react-router';
import {
  EyeOutlined,
} from '@ant-design/icons';
import {HomeWrapper} from './styles';

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const stores = useSelector(state => state.stores.data);
  const loading = useSelector(state => state.stores.loading);

  const columns = [
    {
      title: 'Store Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, row) => (
        <Space style={{ display: 'flex', alignItems: 'center'}}>
          <Avatar src={row.cover} size={56} />
          <b>
            {text}
          </b>
        </Space>
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Manager',
      dataIndex: 'admin',
      key: 'admin',
      // width: 260,
      render: (text, row) => (
        <Row gutter={[10, 10]}>
          <Col span={6}>
            Name:
          </Col>
          <Col span={18}>
            {text}
          </Col>
          <Col span={6}>
            Email: 
          </Col>
          <Col span={18}>
            {row?.email}
          </Col>
          <Col span={6}>
            Phone:
          </Col>
          <Col span={18}>
            {row?.phone}
          </Col>
        </Row>
      ),
    },

    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive, row) => (
        <Switch
          checked={isActive}
          onChange={checked => dispatch(disableStore({
          id: row.id,
          isActive: checked,
        }))}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      render: (text, record) => (
        <Space size="middle">
          <Button className="btn-view" onClick={() => history.push(`/stores/${record.id}`)}>
            <EyeOutlined />

          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getStores());
    // eslint-disable-next-line
  }, []);
  return (
    <HomeWrapper>
      <PageTitle className="breadcrumb-section">
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            <Link to="/stores">
              <h1>Stores Management</h1>
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </PageTitle>
      <Divider />
      <Table columns={columns} loading={loading} dataSource={stores} />
    </HomeWrapper>
  );
};

Home.propTypes = {};

export default Home;
