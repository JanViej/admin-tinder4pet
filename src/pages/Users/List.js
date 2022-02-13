/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, disableUser } from '@redux/users/actions';
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
  Tooltip,
} from 'antd';
import { Link } from 'react-router-dom';
import i18next from 'i18next';
import { MaleIcon, FemaleIcon } from 'components/SVGIcon';
import PageTitle from 'components/common/PageTitle';
// import { useHistory } from 'react-router';
import { EyeOutlined } from '@ant-design/icons';
import { HomeWrapper, DetailUserWrapper } from './styles';

const Home = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const users = useSelector((state) => state.users.data);
  const loading = useSelector((state) => state.users.loading);
  const [currentData, setCurrentData] = useState();
  const [visible, setVisible] = useState(false);

  const columns = [
    {
      title: 'Pet',
      dataIndex: 'petName',
      key: 'petName',
      render: (text, row) => (
        <Space style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={row.avatar} size={56} />
          <b>
            {text} {row.petGender === 'male' && <MaleIcon />}
            {row.petGender === 'female' && <FemaleIcon />}
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
      width: 150,
    },
    {
      title: 'Owner',
      dataIndex: 'ownerName',
      key: 'ownerName',
      render: (ownerName, row) => <b>{ownerName ? ownerName : row?.gmail}</b>,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
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
              disableUser({
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
    dispatch(getUsers());
    // eslint-disable-next-line
  }, []);

  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );

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
          User Profile
        </p>
        <p className="site-description-item-profile-p">Pet</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Pet Name" content={currentData?.petName} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Type" content={currentData?.type} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Breed" content={currentData?.breed} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Age" content={currentData?.age} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Weight" content={currentData?.weight} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Gender" content={currentData?.petGender} />
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
        <p className="site-description-item-profile-p">Owner</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Name" content={currentData?.ownerName} />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Phone No"
              content={currentData?.phoneNumber}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Address" content={currentData?.address} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Email" content={currentData?.gmail} />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Background</p>
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
        <p className="site-description-item-profile-p">Matching</p>
        <Row>
          <Col span={24}>
            <Avatar.Group>
              {currentData?.match?.map((item) => (
                <Tooltip title={item?.name} placement="top">
                  <Avatar src={item?.avatar} />
                </Tooltip>
              ))}
            </Avatar.Group>
          </Col>
        </Row>
      </DetailUserWrapper>
    </HomeWrapper>
  );
};

Home.propTypes = {};

export default Home;
