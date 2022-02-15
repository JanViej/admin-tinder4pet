/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getApplications } from '@redux/applications/actions';
import {
  Breadcrumb,
  Table,
  Space,
  Avatar,
  Divider,
  Tag,
  Button,
  Row,
  Col,
  Radio,
  Image,
} from 'antd';
import { Link } from 'react-router-dom';
import PageTitle from 'components/common/PageTitle';
import { useHistory } from 'react-router';
import { EyeOutlined } from '@ant-design/icons';
import { HomeWrapper, DetailUserWrapper } from './styles';
import { useApplicationFilter } from '../../hooks/useApplicationFilter';
import { acceptForm, denyForm } from '../../@redux/applications/actions';
import { actions } from '@redux/applications/slice';

const STATUS = [
  {
    value: 'PENDING',
    color: '#ff9500',
    text: 'Pending',
  },
  {
    value: 'ACCEPTED',
    color: '#32a842',
    text: 'Accepted',
  },
  {
    value: 'REJECTED',
    color: '#d62822',
    text: 'Rejected',
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const applications = useSelector((state) => state.applications.data);
  const loading = useSelector((state) => state.applications.loading);
  const { getApplicationWith } = useApplicationFilter();
  const [visible, setVisible] = useState(false);
  const [currentData, setCurrentData] = useState();
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingDeny, setLoadingDeny] = useState(false);

  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );
  const [filterData, setFilterData] = useState(applications);
  const columns = [
    {
      title: 'Application Name',
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (type) => (
        <Tag color={STATUS.find((status) => status.value === type).color}>
          {STATUS.find((status) => status.value === type).text}
        </Tag>
      ),
    },
    {
      title: 'Application Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => <Tag>{type}</Tag>,
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

  const handleClickAccept = () => {
    setLoadingAccept(true);
    const { type, status, id, key, ...data } = currentData;
    dispatch(
      acceptForm({
        id: currentData?.id,
        data: { ...data, isActive: true },
        type: currentData?.type
      })
    ).then((res) => {
      setLoadingAccept(false);
      if (res?.meta?.requestStatus === 'fulfilled') {
        setVisible(false);
      }
    });
  };

  const handleClickDeny = () => {
    setLoadingDeny(true);
    dispatch(
      denyForm({
        id: currentData?.id,
      })
    ).then((res) => {
      setLoadingDeny(false);

      if (res?.meta?.requestStatus === 'fulfilled') {
        setVisible(false);
      }
    });
  };

  useEffect(() => {
    setFilterData(applications);
  }, [applications]);

  useEffect(() => {
    dispatch(getApplications());
    // eslint-disable-next-line
  }, []);

  return (
    <HomeWrapper>
      <PageTitle
        className="breadcrumb-section"
        extraAction={
          <Radio.Group
            defaultValue="ALL"
            size="medium"
            onChange={(e) => {
              setFilterData(getApplicationWith(e?.target?.value));
            }}
          >
            <Radio.Button value="ALL">All</Radio.Button>
            <Radio.Button value="VET">Vet</Radio.Button>
            <Radio.Button value="STORE">Store</Radio.Button>
          </Radio.Group>
        }
      >
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            <Link to="/applications">
              <h1>Applications Management</h1>
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </PageTitle>

      <Divider />
      <Table columns={columns} loading={loading} dataSource={filterData} />
      <DetailUserWrapper
        placement="right"
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
        width={640}
        closable={false}
        {...(currentData?.status === 'PENDING' && {
          footer: (
            <div className="btn-row">
              <Button
                loading={loadingAccept}
                disabled={loadingDeny}
                type="primary"
                onClick={handleClickAccept}
              >
                Accept
              </Button>
              <Button
                loading={loadingDeny}
                disabled={loadingAccept}
                onClick={handleClickDeny}
              >
                Deny
              </Button>
            </div>
          ),
        })}
      >
        <p
          className="site-description-item-profile-p"
          style={{ marginBottom: 24 }}
        >
          Application: <b>{currentData?.name}</b>
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
        <p className="site-description-item-profile-p">
          Images from {currentData?.type === 'VET' ? 'vet' : 'store'}
        </p>
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
