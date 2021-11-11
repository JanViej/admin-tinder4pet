import styled from 'styled-components';
import Layout from 'antd/lib/layout';

const { Header } = Layout;

export const HeaderWrapper = styled(Header)`
  display: flex;
  align-items: center;
  padding: 24px;
  width: 100%;
  height: 88px;
  border-none;

  &.ant-layout-header {
    background: #fff;
  }

  .drawer {
    display: none;
  }

  .anticon > svg {
    font-size: 18px;
  }

  .ant-input-affix-wrapper {
    border-radius: 20px;
    height: fit-content;
    font-size: 14px;
    line-height: 16.94px;
    padding: 9px 16px;
  }

  .searching-section {
    width: 50%;
    display: flex;
    align-items: center;
    .icon {
      padding-right: 27px;
      border: none;
      box-shadow: none;
    }

    .anticon > svg {
      font-size: 20px;
    }
  }

  .user-section {
    display: flex;
    width: 50%;
    justify-content: flex-end;
    align-items: center;
    .name {
      padding-left: 23px;
      padding-right: 12px;
      h3,
      p {
        text-align: right;
        margin-bottom: 0;
      }
      h3 {
        font-weight: 700;
        font-size: 16px;
        line-height: 19.36px;
        padding-bottom: 5px;
      }
      p {
        font-weight: 400;
        font-size: 14px;
        line-height: 14.52px;
      }
    }

    .ant-avatar-image {
      width: 40px;
      height: 40px;
    }

    .ant-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100px;
      height: 35px;
      width: 35px;
      padding-bottom: 5px;
      border: none;
      background: #fff7e8;

      .anticon > svg {
        font-size: 20px;
        fill: #f5a303;
      }

      &.bell {
        margin-left: 14px;
      }
    }
  }

  @media (max-width: 1470px){
    padding: 10px;
    height: 60px;
    .anticon > svg {
      font-size: 15px !important;
    }

    .ant-input-affix-wrapper {
      font-size: 14px;
      line-height: 16.94px;
      padding: 5px 16px;
    }

    .user-section {
      margin-right: 10px;
      .name {
        h3 {
          font-size: 14px;
          line-height: 16px;
        }
        p {
          font-weight: 400;
          font-size: 12px;
          line-height: 13px;
        }
      }
    }
  }

  @media (max-width: 850px) {
    padding: 10px;
    height: 70px;
    .name {
      display: none;
    }
    .avatar {
      padding: 0 14px;
    }
    .searching-section {
      width: 75%;
      padding-right: 5px;
      .icon {
        width: 15%;
        padding: 0;
        padding-right: 5px;
      }
      .
    }

    .user-section {
      width: 25%;
      justify-content: space-around;

      .ant-btn {
        width: 40px;
      height: 40px;
      
    }
  }
`;
