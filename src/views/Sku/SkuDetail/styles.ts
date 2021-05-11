import styled from 'styled-components/macro';

export const HeaderContainer = styled.div`
  background-color: #1a1a1a;
`;

export const HeaderContent = styled.div`
  max-width: 1440px;
  margin: auto;
  display: flex;
  flex-direction: row;
  height: 700px;
  color: white;
  justify-content: space-between;
  @media screen and (max-width: 960px) {
    flex-direction: column;
    height: auto;
  }
`;

export const HeaderLeft = styled.div`
  width: 54%;
  padding: 0 0 0 80px;

  @media screen and (max-width: 960px) {
    padding: 0 0 0 0px;
    width: 100%;
  }
`;

export const HeaderRight = styled.div`
  width: 46%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

export const ProductDetail = styled.div`
  padding: 48px 80px 20px 48px;
`;

export const Listing = styled.div`
  width: 46%;
  max-width: 713px;
  margin-left: 64px;
`;

export const SkuTitle = styled.div`
  font-size: 48px;
`;

export const Brand = styled.h3`
  font-size: 24px;
  color: #8e8e8e;
  margin-bottom: 16px;
  :hover {
    cursor: pointer;
  }
`;

export const ButtonsContainer = styled.div`
  // border: 2px solid red;
`;

export const Tile = styled.div`
  width: 305px;
  height: 515px;
  background-color: #ddd8db;
  border-radius: 20px;
  margin-right: 15px;
`;

export const TileContainer = styled.div<{ index: number }>`
  padding: 0 20px;
  float: left;
  padding-left: ${({ index }) => `${index === 0 ? '0px' : '10px'}`};
`;

interface ISection {
  flexDirection?: string;
  color?: string;
  padding?: string;
}

export const Section = styled.section<ISection>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || 'column'};
  color: ${(props) => props.color || 'inherit'};
  max-width: 1440px;
  padding: ${(props) => props.padding || '0 80px 48px 80px'};
  margin: auto;
  font-size: 16px;
  // border: solid red 1px;

  @media screen and (max-width: 960px) {
    flex-direction: column;
    padding: 56px 24px 0 24px;
  }
`;

export const SectionTitle = styled.h2`
  font-weight: 600 !important;
  font-size: 24px;
  border-bottom: 2px solid #ebebeb;
  line-height: 2.2;
  margin-bottom: 40px;
  font-weight: 500px;
  color: black;
`;

export const SectionSubTitle = styled.h3`
  font-weight: 600 !important;
  font-size: 18px;
  color: black;
`;

export const TilesContainer = styled.div`
  display: flex;
`;

export const Breadcrumbs = styled.div`
  margin-bottom: 40px;
  a {
    text-decoration: none;
    color: grey;
  }
`;

export const Rarity = styled.div`
  display: flex;
  align-items: center;
  color: #2ddebf;

  span {
    border-radius: 50%;
    background-color: #2ddebf;
    height: 20px;
    width: 20px;
    display: inline-block;
    margin-right: 8px;
  }
`;

export const LineDivider = styled.div`
  height: 1px;
  background-color: #464646;
  width: 40px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const ProductContainer = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  height: 36em;
  margin-bottom: 30px;

  @media screen and (max-width: 960px) {
    flex-direction: column;
    padding: 56px 24px 0 24px;
    overflow-x: hidden;
    overflow-y: auto;
    height: auto;
    align-items: center;
  }

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
