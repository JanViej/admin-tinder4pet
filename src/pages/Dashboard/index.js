/* eslint-disable */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { getProgramSummarySelector, getUserReportSelector, getStartUpReportSelector } from '@redux/config/selectors';
import { getUserReport, getStartUpReport } from '@redux/config/actions';
import i18next from 'i18next';
import theme from 'configs/theme/default';
import PageTitle from 'components/common/PageTitle';
import HomeWrapper from './styles';

const Home = () => {
  const summaries = useSelector(getProgramSummarySelector);
  const userReport = useSelector(getUserReportSelector);
  const startUpReport = useSelector(getStartUpReportSelector);
  const dispatch = useDispatch();

  const handleChange = values => {
    dispatch(getUserReport({
      startDate: values?.[0]?.format('YYYY-MM-DD'),
      endDate: values?.[1]?.format('YYYY-MM-DD'),
      groupBy: 'day'
    }));
  }

  const handleChangeStartUpChart = values => {
    dispatch(getStartUpReport({
      startDate: values?.[0]?.format('YYYY-MM-DD'),
      endDate: values?.[1]?.format('YYYY-MM-DD'),
      groupBy: 'day'
    }));
  }

  const startUpLegendData = [
    {
      color: theme.palette.primary,
      title: i18next.t('summary.startUp'),
      dataKey: 'startUp',
    }
  ]

  const legendData = [
    {
      color: theme.palette.primary,
      title: i18next.t('summary.startUp'),
      dataKey: 'startUp',
    },
    {
      color: theme.color.blueShade,
      title: i18next.t('summary.coach'),
      dataKey: 'coach',
    },
    {
      color: theme.background.disabled,
      title: i18next.t('summary.service'),
      dataKey: 'service',
    },
  ];

  useEffect(() => {
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
    </HomeWrapper>
  );
};

Home.propTypes = {};

export default Home;
