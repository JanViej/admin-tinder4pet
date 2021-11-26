import React from 'react';
import { Typography } from 'antd';
import I18n from 'i18next';
import PropTypes from 'prop-types';
import { SummaryCardWrapper } from './styles';

const { Text, Title } = Typography;

const SummaryCard = ({ onClick = () => {}, color, value, values, header, Icon }) => (
  <SummaryCardWrapper onClick={onClick} style={{ background: color }}>
    <div className="vInfo">
      <div className="header-row">
        <Text type="h1SemiBold" className="title">
          {I18n.t(header)}
        </Text>
        <div>{Icon && <Icon theme="outlined" className="icon" />}</div>
      </div>
      <br />
      {values ? (
        values.map((e) => (
          <div className="row">
            <div>{Icon && <Icon theme="outlined" className="icon" />}</div>
            <Title type="h5" className="value">
              {` ${e.value}`}
            </Title>
          </div>
        ))
      ) : (
        <div className="row">
          <Title type="h1" className="value">
            {value}
          </Title>
        </div>
      )}
    </div>
  </SummaryCardWrapper>
);
SummaryCard.propTypes = {
  color: PropTypes.string,
  value: PropTypes.any,
  header: PropTypes.any,
  Icon: PropTypes.any,
  values: PropTypes.array,
  onClick: PropTypes.func,
};

export default SummaryCard;
