import styled from 'styled-components';

export const SummaryCardWrapper = styled.div`
  display: flex;
  padding: 20px;
  justify-content: center;
  align-items: flex-start;
  border-radius: 16px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.06);
  height: 100%;
  background: #fff;

  &.clickable {
    cursor: pointer;
  }

  .summary-section {
    flex-grow: 1;

    p {
      text-align: left;
      font-size: 12px;
      font-weight: 600;
      line-height: 17px;
      margin: 0;
      color: #7A7A9D;
    }

    h2 {
      text-align: left;
      font-size: 28px;
      font-weight: 600;
      line-height: 38px;
      color: #16192C;
      margin: 0;
    }
  }

  .icon-section {
    border-radius: 50%;
    padding: 13px;
    background: ${({ backgroundColor }) => backgroundColor};
    height: fit-content;

    & > * {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
    }
  }

  @media (max-width: 1470px) {
    padding: 18px;
    .summary-section {
      h2 {
        font-size: 24px;
        line-height: 30px;
      }
    }
  }
`;
