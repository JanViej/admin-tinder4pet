/* eslint-disable */
import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Breadcrumb, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { getProgramSummarySelector, getUserReportSelector, getStartUpReportSelector } from '@redux/config/selectors';
import { getUserReport, getStartUpReport } from '@redux/config/actions';
import i18next from 'i18next';
import moment from 'moment';
import map from 'lodash/map';
import { Pie, Bar, Line } from '@ant-design/charts';
import SummaryCard from './components/SummaryCard';
import theme from 'configs/theme/default';
import PageTitle from 'components/common/PageTitle';

import firebase from 'firebase/app';

import { getUsers } from '@redux/users/actions';
import { getVets } from '@redux/vets/actions';
import { getStores } from '@redux/stores/actions';
import { getApplications } from '@redux/applications/actions';

import HomeWrapper from './styles';

// const dataApplications = [
//   {
//     address: '33 Ta My Duat',
//     admin: 'Karen',
//     cover: 'https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/rn_image_picker_lib_temp_11f22c56-297a-46c8-a05d-6cf19e86a4fd.jpg?alt=media&token=51d2fa7d-3323-4e1f-b55e-2b9117d7ef35',
//     description: 'form application',
//     email: 'karen@gmail.com',
//     images: ['https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/rn_image_picker_lib_temp_11f22c56-297a-46c8-a05d-6cf19e86a4fd.jpg?alt=media&token=51d2fa7d-3323-4e1f-b55e-2b9117d7ef35'],
//     lat: 16.06978655329242,
//     long: 108.23471679738623,
//     name: 'test application',
//     phone: '0967705705',
//     type: 'VET',
//     status: 'PENDING'
//   },
//   {
//     address: '33 Ta My Duat',
//     admin: 'Karen',
//     cover: 'https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/rn_image_picker_lib_temp_11f22c56-297a-46c8-a05d-6cf19e86a4fd.jpg?alt=media&token=51d2fa7d-3323-4e1f-b55e-2b9117d7ef35',
//     description: 'form application',
//     email: 'karen@gmail.com',
//     images: ['https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/rn_image_picker_lib_temp_11f22c56-297a-46c8-a05d-6cf19e86a4fd.jpg?alt=media&token=51d2fa7d-3323-4e1f-b55e-2b9117d7ef35'],
//     lat: 16.06978655329242,
//     long: 108.23471679738623,
//     name: 'test application',
//     phone: '0967705705',
//     type: 'VET',
//     status: 'PENDING'
//   },
//   {
//     address: '33 Ta My Duat',
//     admin: 'Karen',
//     cover: 'https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/rn_image_picker_lib_temp_11f22c56-297a-46c8-a05d-6cf19e86a4fd.jpg?alt=media&token=51d2fa7d-3323-4e1f-b55e-2b9117d7ef35',
//     description: 'form application',
//     email: 'karen@gmail.com',
//     images: ['https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/rn_image_picker_lib_temp_11f22c56-297a-46c8-a05d-6cf19e86a4fd.jpg?alt=media&token=51d2fa7d-3323-4e1f-b55e-2b9117d7ef35'],
//     lat: 16.06978655329242,
//     long: 108.23471679738623,
//     name: 'test application',
//     phone: '0967705705',
//     type: 'VET',
//     status: 'ACCEPTED'
//   },
//   {
//     address: '33 Ta My Duat',
//     admin: 'Karen',
//     cover: 'https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/rn_image_picker_lib_temp_11f22c56-297a-46c8-a05d-6cf19e86a4fd.jpg?alt=media&token=51d2fa7d-3323-4e1f-b55e-2b9117d7ef35',
//     description: 'form application',
//     email: 'karen@gmail.com',
//     images: ['https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/rn_image_picker_lib_temp_11f22c56-297a-46c8-a05d-6cf19e86a4fd.jpg?alt=media&token=51d2fa7d-3323-4e1f-b55e-2b9117d7ef35'],
//     lat: 16.06978655329242,
//     long: 108.23471679738623,
//     name: 'test application',
//     phone: '0967705705',
//     type: 'VET',
//     status: 'PENDING'
//   },
//   {
//     address: '33 Ta My Duat',
//     admin: 'Karen',
//     cover: 'https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/rn_image_picker_lib_temp_11f22c56-297a-46c8-a05d-6cf19e86a4fd.jpg?alt=media&token=51d2fa7d-3323-4e1f-b55e-2b9117d7ef35',
//     description: 'form application',
//     email: 'karen@gmail.com',
//     images: ['https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/rn_image_picker_lib_temp_11f22c56-297a-46c8-a05d-6cf19e86a4fd.jpg?alt=media&token=51d2fa7d-3323-4e1f-b55e-2b9117d7ef35'],
//     lat: 16.06978655329242,
//     long: 108.23471679738623,
//     name: 'test application',
//     phone: '0967705705',
//     type: 'VET',
//     status: 'PENDING'
//   },
//   {
//     address: '33 Ta My Duat',
//     admin: 'Karen',
//     cover: 'https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/rn_image_picker_lib_temp_11f22c56-297a-46c8-a05d-6cf19e86a4fd.jpg?alt=media&token=51d2fa7d-3323-4e1f-b55e-2b9117d7ef35',
//     description: 'form application',
//     email: 'karen@gmail.com',
//     images: ['https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/rn_image_picker_lib_temp_11f22c56-297a-46c8-a05d-6cf19e86a4fd.jpg?alt=media&token=51d2fa7d-3323-4e1f-b55e-2b9117d7ef35'],
//     lat: 16.06978655329242,
//     long: 108.23471679738623,
//     name: 'test application',
//     phone: '0967705705',
//     type: 'STORE',
//     status: 'ACCEPTED'
//   },
//   {
//     address: '33 Ta My Duat',
//     admin: 'Karen',
//     cover: 'https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/rn_image_picker_lib_temp_11f22c56-297a-46c8-a05d-6cf19e86a4fd.jpg?alt=media&token=51d2fa7d-3323-4e1f-b55e-2b9117d7ef35',
//     description: 'form application',
//     email: 'karen@gmail.com',
//     images: ['https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/rn_image_picker_lib_temp_11f22c56-297a-46c8-a05d-6cf19e86a4fd.jpg?alt=media&token=51d2fa7d-3323-4e1f-b55e-2b9117d7ef35'],
//     lat: 16.06978655329242,
//     long: 108.23471679738623,
//     name: 'test application',
//     phone: '0967705705',
//     type: 'VET',
//     status: 'REJECTED'
//   },
//   {
//     address: '33 Ta My Duat',
//     admin: 'Karen',
//     cover: 'https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/rn_image_picker_lib_temp_11f22c56-297a-46c8-a05d-6cf19e86a4fd.jpg?alt=media&token=51d2fa7d-3323-4e1f-b55e-2b9117d7ef35',
//     description: 'form application',
//     email: 'karen@gmail.com',
//     images: ['https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/rn_image_picker_lib_temp_11f22c56-297a-46c8-a05d-6cf19e86a4fd.jpg?alt=media&token=51d2fa7d-3323-4e1f-b55e-2b9117d7ef35'],
//     lat: 16.06978655329242,
//     long: 108.23471679738623,
//     name: 'test application',
//     phone: '0967705705',
//     type: 'VET',
//     status: 'REJECTED'
//   },
// ]

const Home = () => {
  const dispatch = useDispatch();

  const users = useSelector(state => state.users.data);
  const vets = useSelector(state => state.vets.data);
  const stores = useSelector(state => state.stores.data);
  const applications = useSelector(state => state.applications.data);

  const lineChartData = useMemo(() => {
    const counts = {};
    if (users?.length) {
      users.forEach(user => {
        counts[moment(user?.createdAt).startOf('d').format('D MMM YYYY')] = (counts[moment(user?.createdAt).startOf('d').format('D MMM YYYY')] || 0) + 1;
      });
      return map(counts, (value, key) => ({
        count: value,
        createdAt: key,
      }))
    }
    return [];
  }, [users])

  const lineConfig = {
    data: lineChartData,
    padding: 'auto',
    xField: 'createdAt',
    yField: 'count',
  };

  const pieChartData = useMemo(() => {
    if (applications) {
      return [
        {
          type: 'Pending',
          value: applications?.filter(application => application.status === 'PENDING')?.length,
        },
        {
          type: 'Accepted',
          value: applications?.filter(application => application.status === 'ACCEPTED')?.length,
        },
        {
          type: 'Rejected',
          value: applications?.filter(application => application.status === 'REJECTED')?.length,
        },
      ]
    }
    return []
  }, [applications])

  const pieConfig = {
    appendPadding: 10,
    data: pieChartData,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      autoRotate: false,
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: 14,
        },
        content: 'Applications',
      },
    },
    legend: { position: 'top' },
  };


  useEffect(() => {
    dispatch(getUsers())
    dispatch(getVets())
    dispatch(getStores())
    dispatch(getApplications())
    // dataApplications.forEach(event => {
    //   firebase
    //     .firestore()
    //     .collection('applications')
    //     .add(event);
    // })
    // dispatch(getSummaries());
    // eslint-disable-next-line
  }, []);
  return (
    <HomeWrapper>
      <PageTitle className="breadcrumb-section">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link to="/">
              <h1>{i18next.t('dashboard.header')}</h1>
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </PageTitle>
      <Row style={{ width: '100%'}} className="w-100" gutter={[16, 16]}>
        <Col md={8}>
          <SummaryCard
            color="#f58a45"
            value={users?.length}
            header="Users"
          />
        </Col>
        <Col md={8}>
          <SummaryCard
            color="#3ebac2"
            value={vets?.length}
            header="Vets"
          />
        </Col>
        <Col md={8}>
          <SummaryCard
            color="#F75D81"
            value={stores?.length}
            header="Stores"
          />
        </Col>
        <Col md={16}>
          <Card title="Users">
            <Line {...lineConfig} />
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Pie {...pieConfig} />
          </Card>
        </Col>
      </Row>
    </HomeWrapper>
  );
};

Home.propTypes = {};

export default Home;
