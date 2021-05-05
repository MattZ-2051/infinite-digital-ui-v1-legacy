import styled from 'styled-components';

export const FlexRow = styled.div<{ theme }>`
  display: flex;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: column;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: column;
  }

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
