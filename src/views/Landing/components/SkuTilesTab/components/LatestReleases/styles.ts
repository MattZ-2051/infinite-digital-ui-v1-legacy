import styled from 'styled-components/macro';

export const TileContainer = styled.div<{ index: number }>`
  padding: 0;
  @media screen and (max-width: 600px) {
    padding: 0;
  }
`;

export const ProductContainer = styled.div`
  && {
    display: grid;
    grid-gap: 26px;
    grid-template-columns: repeat(auto-fit, 300px);
    justify-content: center;
    align-items: center;
    max-width: 1440px;
    margin: auto;
    height: 100%;

    @media screen and (max-width: 960px) {
      justify-content: center;
      grid-template-columns: none;
    }

    @media screen and (max-width: 600px) {
      justify-content: center;
      margin: auto;
      width: 320px;
    }

    ::-webkit-scrollbar {
      height: 0.4em;
    }
    ::-webkit-scrollbar-button {
      width: 0.1em;
    }
    ::-webkit-scrollbar-track-piece {
    }
    ::-webkit-scrollbar-thumb {
      background: var(--grey-40);
      width: 1px !important;
      border-radius: 10px;
    }
  }
`;
