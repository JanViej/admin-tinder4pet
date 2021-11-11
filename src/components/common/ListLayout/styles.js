import styled from 'styled-components';

export const ListWrapper = styled.div`
  .ant-table-tbody {
    .ant-table-cell.ant-table-cell-fix-right.ant-table-cell-fix-right-first {
      padding-left: 0 !important;
    }
  }

  .ant-tabs-content-holder {
    height: 100%;
  }

  .table-content {
    .vActions {
      .ant-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        height: auto;
        padding: 3px 25px;
      }
    }
  }
`;
