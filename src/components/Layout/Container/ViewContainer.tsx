import styled from 'styled-components';

export const ViewContainer = styled.div<{ theme }>`
  width: 100%;
  margin: auto;
  padding: 48px 80px 48px 80px;
  background-color: black;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: ${({ theme }) => theme.devices.lg};
  }
`;
