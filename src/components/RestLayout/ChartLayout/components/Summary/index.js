import React from 'react';
import PropTypes from 'prop-types';
import SummaryCard from 'components/common/SummaryCard';
import SummaryStyles from './styles';

const Summary = ({ data }) => {
  return (
    <SummaryStyles>
      {data?.map(item => (
        <SummaryCard {...item} titleType="h7" className="summary-item" />
      ))}
    </SummaryStyles>
  )
}

Summary.propTypes = {
  data: PropTypes.array,
};

export default Summary;