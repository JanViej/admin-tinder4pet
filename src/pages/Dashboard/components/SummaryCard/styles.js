import styled from 'styled-components';

export const SummaryCardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.background.content};
  border-radius: 20px;
  box-shadow: 0 1px 20px 0px rgb(0 0 0 / 15%);
  padding: 15px 20px 20px 25px;
  align-items: flex-end;
  .vIcon {
  }
  .icon {
    font-size: 24px;
    line-height: 36px;
    color: white;
    height: 36px;
  }
  .title,
  .value {
    color: #000;
    background: transparent;
  }
  .h5 {
    margin-left: 10px;
    margin-bottom: 3px;
  }
  .vInfo {
    flex: 1;
    width: 100%;
  }
  .row {
    display: flex;
    align-items: center;
  }
  .header-row {
    display: flex;
    justify-content: space-between;
  }
`;
