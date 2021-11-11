import styled from 'styled-components';

export const PrivateLayoutWrapper = styled.div`
  height: 100%;

  * {
    font-family: Inter, sans-serif !important;
    letter-spacing: 0.6px;
  }
  .overlay {
    opacity: 0;
    z-index: -1;
  }

  .ant-layout-header {
    padding: 0 30px;
  }

  #collapsedTracker {
    width: 0px;
    height: 0px;
    position: absolute;
  }

  #collapsedTracker:checked ~ .sidebar {
    width: 248px !important;
    min-width: 248px !important;
    max-width: 248px !important;

    .logo {
      .full-logo {
        opacity: 1;
      }
    }
  }

  .page-content-wrapper {
    height: 100vh;
    overflow: hidden;
    margin-left: 80px;
    transition: all 0.3s ease 0s;

    .page-content {
      overflow-y: auto;
    }
  }

  .sider-section-collapsed {
    height: 100%;
  }

  .ant-layout {
    overflow-y: auto;
    height: 100vh;
  }

  .ant-layout-content {
    background: #f2f7f9d6;
    padding: 25px;
  }

  #collapsedTracker:checked ~ .page-content-wrapper {
    margin-left: 248px !important;
  }
  @media only screen and (max-width: 430px) {
    .sidebar {
      left: -80px;
      position: fixed;
      z-index: 9999;
    }
    .page-content-wrapper {
      margin-left: 0px;
      z-index: 1;
    }
    .overlay {
      z-index: 9998;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: 0;
      pointer-events: none;
      background: rgba(0, 0, 0, 0.5);
      transition: all 0.5s ease 0s;
    }
    #collapsedTracker:checked ~ .sidebar {
      left: 0px;
    }

    #collapsedTracker:checked ~ .page-content-wrapper {
      margin-left: 0px !important;
      z-index: 1;
    }
    #collapsedTracker:checked ~ .overlay {
      opacity: 1;
      pointer-events: auto;
    }
  }

  @media (max-width: 850px) {
    .sider-section {
      width: 80px;
    }

    .ant-layout-content {
      padding: 15px 0px 0px;

      .ant-row {
        margin: 0 !important;
        .ant-col {
          padding: 0 !important;
        }
      }
    }
  }

  @media (max-width: 430px) {
    .ant-layout-header {
      padding: 0 10px;
    }
  }
`;
