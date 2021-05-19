import styled from 'styled-components';

export const ViewContainer = styled.div<{ theme }>`
  width: 100%;
  background-color: black;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: ${({ theme }) => theme.devices.lg};
  }
`;
