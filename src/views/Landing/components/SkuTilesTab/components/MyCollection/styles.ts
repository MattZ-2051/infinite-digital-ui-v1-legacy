import styled from 'styled-components/macro';

export const TileContainer = styled.div<{ index: number }>`
  padding-left: ${({ index }) => `${index === 0 ? '0px' : '10px'}`};
  padding: 0 20px;
`;

export const HeaderContainer = styled.div`
  @media screen and (max-width: 600px) {
    display: flex;
    align-items: baseline;
    margin: auto;
  }
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: baseline;
  padding-bottom: 28px;
`;

export const Header = styled.h3`
  padding-top: 40px;
  font-size: 32px;
  line-height: 51.2px;
  font-weight: 600;
`;

export const ProductContainer = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  height: 36em;

  @media screen and (max-width: 600px) {
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
`;
