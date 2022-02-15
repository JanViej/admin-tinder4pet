import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { Row, Col } from 'antd';
import { useHistory } from 'react-router';
import SummaryCard from '../SummaryCard';
import { SummaryRowWrapper } from './styles';

const colStyles = {
  md: 8,
  sm: 8,
  xm: 24,
}


const SummaryRow = ({ summaries }) => {
  const history = useHistory();
  const handleClickCard = path => () => {
    history.push(path);
  }
  return (
    <SummaryRowWrapper>
      <Row type="flex" gutter={16}>
        {summaries.map(summary => (
          <Col {...colStyles}>
            <SummaryCard 
              icon={summary.icon}
              title={i18next.t(summary.title)}
              number={summary.value}
              backgroundColor={summary.backgroundColor}
              {...summary.path && {
                handleClickCard: handleClickCard(summary.path+summary.key),
              }}
            />
          </Col>  
        ))}
      </Row>
    </SummaryRowWrapper>
  );
};

SummaryRow.propTypes = {
  summaries: PropTypes.array,
}

export default SummaryRow;
