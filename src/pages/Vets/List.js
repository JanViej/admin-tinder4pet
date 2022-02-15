/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getVets, disableVet } from '@redux/vets/actions';
import {
  Breadcrumb,
  Table,
  Space,
  Avatar,
  Divider,
  Switch,
  Button,
  Row,
  Col,
  Image,
} from 'antd';
import { Link } from 'react-router-dom';
import PageTitle from 'components/common/PageTitle';
import { EyeOutlined } from '@ant-design/icons';
import { HomeWrapper, DetailUserWrapper } from './styles';

const Home = () => {
  const dispatch = useDispatch();
  const vets = useSelector((state) => state.vets.data);
  const loading = useSelector((state) => state.vets.loading);
  const [currentData, setCurrentData] = useState();
  const [visible, setVisible] = useState(false);
  console.log('asd currentData', currentData);

  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );

  const columns = [
    {
      title: 'Vet Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, row) => (
        <Space style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={row.cover} size={56} />
          <b>{text}</b>
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
          onChange={(checked) =>
            dispatch(
              disableVet({
                id: row.id,
                isActive: checked,
              })
            )
          }
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      render: (text, record) => (
        <Space size="middle">
          <Button
            className="btn-view"
            onClick={() => {
              setCurrentData(record);
              setVisible(true);
            }}
          >
            <EyeOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getVets());
    // eslint-disable-next-line
  }, []);
  return (
    <HomeWrapper>
      <PageTitle className="breadcrumb-section">
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            <Link to="/vets">
              <h1>Vets Management</h1>
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </PageTitle>
      <Divider />
      <Table columns={columns} loading={loading} dataSource={vets} />
      <DetailUserWrapper
        placement="right"
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
        width={640}
        closable={false}
      >
        <p
          className="site-description-item-profile-p"
          style={{ marginBottom: 24 }}
        >
          Vet Profile: <b>{currentData?.name}</b>
        </p>
        <Divider />
        <p className="site-description-item-profile-p">Manager</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Name" content={currentData?.admin} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Phone No" content={currentData?.phone} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Address" content={currentData?.address} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Email" content={currentData?.email} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Description"
              content={currentData?.description}
            />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Images from Vet</p>
        <Row>
          <Col span={24}>
            {/* <DescriptionItem title="Email" content="AntDesign@example.com" /> */}
            <Image.PreviewGroup>
              {currentData?.images?.map((item) => (
                <Image
                  width={50}
                  src={item?.url}
                  preview={{
                    mask: <EyeOutlined />,
                  }}
                />
              ))}
            </Image.PreviewGroup>
          </Col>
        </Row>
      </DetailUserWrapper>
    </HomeWrapper>
  );
};

Home.propTypes = {};

export default Home;
