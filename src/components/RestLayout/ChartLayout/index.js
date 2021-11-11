import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer } from 'recharts';
import { DatePicker } from 'antd';
import i18next from 'i18next';
import moment from 'moment';
import Legend from './components/Legend';
import Summary from './components/Summary';
import CharLayoutStyles from './styles';

const { RangePicker } = DatePicker;

const ChartLayout = ({
  height,
  children,
  showTime,
  summary,
  legend,
  handleChange,
  chartTitle,
  footer,
  noUnderline,
  chartTime,
}) => {
  const handleClick = e => {
    handleChange && handleChange(e);
  }
  return (
    <CharLayoutStyles>
      <div className={`header-section ${noUnderline && 'header-no-underline'}`}>
        <div className="left-section">
          <h1>{i18next.t(chartTitle)}</h1>
          <Legend data={legend} />
        </div>
        {showTime && chartTime?.startDate && chartTime?.endDate && (
          <div className="right-section">
            <RangePicker
              allowClear={false}
              onChange={handleClick}
              {...(chartTime?.startDate && chartTime?.endDate) && {
                defaultValue: [
                  moment(chartTime.startDate),
                  moment(chartTime.endDate),
                ],
              }}
            />
            
          </div>
        )}
      </div>
      <div className="chart-section">
        {summary && (
          <Summary data={summary} />
        )}
        <ResponsiveContainer width="100%" height={height}>
          {children}
        </ResponsiveContainer>
      </div>
      {footer}
    </CharLayoutStyles>
  )
}

ChartLayout.defaultProps = {
  height: 400,
  showTime: true,
  children: <div />,
  footer: <div />,
}

ChartLayout.propTypes = {
  height: PropTypes.number,
  children: PropTypes.node,
  showTime: PropTypes.bool,
  summary: PropTypes.array,
  legend: PropTypes.array,
  handleChange: PropTypes.func,
  chartTitle: PropTypes.string,
  footer: PropTypes.node,
  noUnderline: PropTypes.bool,
  chartTime: PropTypes.string,
}

export default ChartLayout;
