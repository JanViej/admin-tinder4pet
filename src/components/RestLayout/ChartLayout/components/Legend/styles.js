import styled from 'styled-components';

export default styled.div`
  display: flex;
  align-items: center;
  .legend-item {
    display: flex;
    align-items: center;
    margin-right: 15px;
    .legend-dot {
      width: 16px;
      height: 16px;
      margin-right: 5px;
      border-radius: 50%;
    }
  }
`;