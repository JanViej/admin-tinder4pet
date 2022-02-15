import styled from 'styled-components';
import { Drawer } from 'antd';

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

export const DetailUserWrapper = styled(Drawer)`
  .site-description-item-profile-wrapper {
    margin-bottom: 7px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    line-height: 1.5715;
    margin-bottom: 5px;
  }

  .site-description-item-profile-wrapper {
    font-size: 12px;
    line-height: 1.66667;
    margin-bottom: 5px;

  }

  .ant-drawer-body p.site-description-item-profile-p {
    display: block;
    margin-bottom: 16px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 16px;
    line-height: 1.5715;
  }

  .ant-drawer-body p.site-description-item-profile-p {
    font-size: 14px;
    line-height: 1.66667;
    margin-bottom: 5px;
  }

  .site-description-item-profile-p-label {
    display: inline-block;
    margin-right: 8px;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 5px;
  }

  .ant-image {
    margin-right: 10px;
    .ant-image-img {
      width: 50px;
      height: 50px;
      object-fit: cover;
    }
  }

  .ant-divider-horizontal {
    margin: 15px 0px;
  }
`;
