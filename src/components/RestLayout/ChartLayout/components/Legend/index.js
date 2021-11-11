import React from 'react';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import LegendStyles from './styles';

const Legend = ({ data }) => {
  return (
    <LegendStyles>
      {data?.map(item => ( 
        <div className="legend-item" key={item}>
          <div className="legend-dot" style={{ background: item?.color }} />
          <div className="legend-title">
            {i18next.t(item?.title)}
          </div>
        </div>
      ))}
    </LegendStyles>
  )
}

Legend.propTypes = {
  data: PropTypes.array,
};

export default Legend;
