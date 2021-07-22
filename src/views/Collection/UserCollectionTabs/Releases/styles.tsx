import styled, { css } from 'styled-components/macro';

export const TileContainer = styled.div<{ index: number }>`
  padding: 0 12px;
`;

export const hasCollection = css`
  margin: auto;
  :hover {
    overflow: auto;
  }
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  @media screen and (max-width: 840px) {
    justify-content: center;
  }
`;

export const noCollection = css`
  display: flex;
  overflow: auto;
  width: 100%;
`;

export const Container = styled.div<{ collection?: boolean }>`
  ${({ collection }) =>
    collection ? hasCollection : noCollection}// min-height: 70vh;
`;
