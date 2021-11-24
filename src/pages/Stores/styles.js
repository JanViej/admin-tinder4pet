import styled from 'styled-components';

export const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;

  .viewSummary {
    width: 100%;
    margin-bottom: 20px;
  }
  .vBox {
    background: transparent;
    border: none;
    padding: 0 0px;
  }
  .row-chart {
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
  }
  .col-block {
    margin-bottom: 24px;
  }

  .ant-divider-horizontal {
    margin: 0px 0px 20px 0px;
  }

  .anticon-eye {
    font-size: 24px;
  }

  .btn-view {
    border: none;
  }
`;

export const DetailUserWrapper = styled.div`
  .ant-breadcrumb {
    .ant-breadcrumb-link,
    .ant-breadcrumb-separator {
      font-size: 19px;
      font-weight: bold;
    }
  }
`;
