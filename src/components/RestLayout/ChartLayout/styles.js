import styled from 'styled-components';

export default styled.div`
  background: ${({ theme }) => theme.background.content};
  border-radius: 10px;
  box-shadow: 0px 2px 12px rgba(0,0,0,0.06);
  
  .header-section {
    padding: 15px 36px;
    border-bottom: 1px solid ${({ theme }) => theme.border.default};
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left-section {
      display: flex;
      align-items: center;
      h1 {
        font-size: 20px;
        margin: 0;
        margin-right: 40px;
        font-weight: 600;
      }
    }
    .right-section {
      .ant-radio-button-wrapper {
        span {
          font-weight: 600;
        }
      }
      .ant-radio-button-wrapper-checked {
        background: ${({ theme }) => theme.palette.primary};
        span {
          color: ${({ theme }) => theme.background.content};
        }
      }
    }
  }
  .header-no-underline {
    border: none;
  }
  .chart-section {
    padding: 24px;
  }
`;