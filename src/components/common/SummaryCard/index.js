import React from 'react';
import PropTypes from 'prop-types';
import { SummaryCardWrapper } from './styles';

const SummaryCard = ({ handleClickCard, backgroundColor, icon, title, number }) => {
  return (
    <SummaryCardWrapper
      backgroundColor={backgroundColor}
      {...handleClickCard && {
        className: 'clickable',
        onClick: handleClickCard,
      }}
    >
      <div className="summary-section">
        <p>{title}</p>
        <h2>{number}</h2>
      </div>
      <div className="icon-section">{icon}</div>
    </SummaryCardWrapper>
  );
};

SummaryCard.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.string,
  number: PropTypes.string,
  backgroundColor: PropTypes.string,
  handleClickCard: PropTypes.func,
};

SummaryCard.defaultProps = {};

export default SummaryCard;
