import styled from 'styled-components';

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FlexColumn = styled.div<{ childMargin?: string }>`
  display: flex;
  flex-direction: column;

  > * {
    margin: ${(props) => (props.childMargin ? `${props.childMargin};` : `0`)};
  }
`;
