import styled from 'styled-components';
import Layout from 'antd/lib/layout';

const { Sider } = Layout;

export const SiderWrapper = styled(Sider)`
  width: 80px !important;
  min-width: 80px !important;
  max-width: 80px !important;
  height: 100vh;

  border: none;
  overflow: hidden;
  height: 100vh;
  position: fixed !important;
  left: 0;

  .ant-menu-item .img-icon .ant-menu-item-icon,
  .ant-menu-submenu-title .img-icon .ant-menu-item-icon {
    margin-right: 0 !important;
  }

  .ant-menu-title-content {
    margin: 0 !important;
  }

  .ant-menu-vertical .ant-menu-item:not(:last-child), .ant-menu-vertical-left .ant-menu-item:not(:last-child), .ant-menu-vertical-right .ant-menu-item:not(:last-child), .ant-menu-inline .ant-menu-item:not(:last-child) {
    margin-bottom: 4px !important;
  }

  .logo {
    display: flex;
    justify-content: center;
    position: relative;
    height: 80px;

    .full-logo {
      position: absolute;
      opacity: 0;
      transition: all 0.3s;
    }
  }

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }

  .isSelected {
    color: ${({ theme }) => theme.palette.primary};
    border-left: 3px solid ${({ theme }) => theme.palette.primary};

    .cms-link-menu-item {
      color: ${({ theme }) => theme.palette.primary};
    }
    .ant-menu-title-content {
      background-color: ${({ theme }) => `${theme.palette.primary}20`};
    }

    &.ant-menu-item {
      .img-icon {
        filter: invert(90%) sepia(60%) saturate(553%) hue-rotate(348deg)
          brightness(102%) contrast(101%);
      }
      span {
        color: ${({ theme }) => theme.palette.primary};
      }
    }
  }

  .isSelected.allowFill {
    &:hover {
      .img-icon {
        filter: invert(90%) sepia(60%) saturate(553%) hue-rotate(348deg)
          brightness(102%) contrast(101%);
      }
    }
  }

  .ant-menu-item:hover {
    .img-icon {
      filter: invert(90%) sepia(60%) saturate(553%) hue-rotate(348deg)
        brightness(102%) contrast(101%);
    }
  }

  .footer-section {
    display: flex;
    padding: 8px 0px;
    flex-grow: 2;
    align-items: flex-end;
    justify-content: center;
  }

  .ant-menu-item-selected {
    .img-icon {
      filter: invert(90%) sepia(60%) saturate(553%) hue-rotate(348deg)
        brightness(102%) contrast(101%);
    }
  }

  .img {
    padding: 30px 20px 20px;
    margin: auto;
    height: 90px;
  }

  &.ant-layout-sider {
    background: #fff;
  }

  .anticon {
    padding-right: 10px;
    box-shadow: none;
  }

  .ant-menu-item {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    height: auto !important;
    padding: 5px 10px !important;

    .ant-menu-title-content {
      width: 100%;
      padding: 0px 12px;
      border-radius: 8px;
    }
    .anticon {
      font-size: 16px !important;
    }

    .img-icon {
      img {
        width: 16px;
        min-width: 16px;
        height: 16px;
        object-fit: contain;
      }
    }

    .img-icon {
      margin-right: 20px !important;
      margin-left: 0px !important;
    }

    & > a {
      flex-grow: 2;
    }
  }

  .cms-link-menu-item {
    display: flex;
    align-items: center;
    flex-grow: 2 !important;

    .cms-link-item-text {
      flex-grow: 2;
      margin: 0 !important;
    }

    .anticon {
      margin-right: 20px !important;
    }
  }

  .ant-menu-inline .ant-menu-item::after {
    border: none;
  }

  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: transparent;
  }

  .ant-menu-inline-collapsed {
    .ant-menu-item {
      .img-icon {
        margin-right: 0 !important;
      }
    }

    .cms-link-menu-item {
      justify-content: center;
      height: 40px;

      .cms-link-item-text {
        display: none !important;
      }
      .anticon {
        margin-right: 0px !important;
        line-height: 0;
      }
    }
  }

  .ant-menu-inline {
    border: none;
  }

  .ant-menu-inline-collapsed {
    display: flex;
    flex-direction: column;
    justify-content: center;

    & .ant-menu-item > .anticon {
      width: auto;
      opacity: 1;
    }

    .ant-menu-item {
      display: flex;
      justify-content: center;
      margin: 0;
      padding: 0;

      .img-icon {
        margin: 0;
      }
    }

    .ant-menu-item-selected {
      border-radius: 50px;
      width: 53px;
      height: 53px;
      margin: auto;
    }
  }

  &.ant-layout-sider-collapsed {
    padding: 0 !important;
    .footer-section {
      display: none;
    }
  }

  .ant-menu-inline-collapsed {
    border: none;
  }

  @media (max-width: 1470px) {
    .img {
      padding: 30px 20px 20px;
      margin: auto;
      height: 80px;
    }
  }
`;
