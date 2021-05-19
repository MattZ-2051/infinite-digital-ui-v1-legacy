import styled from 'styled-components';

export const FlexRow = styled.div<{ theme }>`
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
  }
`;

export const FlexColumn = styled.div<{ childMargin?: string }>`
  display: flex;
  flex-direction: column;

  > * {
    margin: ${({ childMargin }) => (childMargin ? `${childMargin};` : `0`)};
  }
`;
