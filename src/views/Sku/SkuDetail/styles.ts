import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { Theme } from 'theme/theme';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export const HeaderContainer = styled.div`
  background-color: #1a1a1a;
`;

export const HeaderContent = styled.div`
  max-width: 1440px;
  margin: auto;
  display: flex;
  min-height: 700px;
  flex-direction: row;
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

export const SlashStyle = styled.span`
  color: '#7c7c7c',
  fontWeight: 600,
  padding: '0 5px',
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
  @media (min-width: 960px) {
    padding: 48px 80px 20px 48px;
  }
  @media (max-width: 959px) {
    padding: 48px 24px 20px 24px;
  }
`;

export const Listing = styled.div`
  width: 46%;
  max-width: 713px;
  margin-left: 64px;
`;

export const SkuTitle = styled.div`
  font-size: 48px;
  letter-spacing: -2px;
  line-height: 61px;
  font-style: normal;
  font-weight: 700;
`;

export const Brand = styled.h3`
  font-size: 24px;
  color: #8e8e8e;
  font-weight: 700;
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
  padding-left: ${({ index }) => `${index === 0 ? '0px' : '4px'}`};
`;

interface ISection {
  flexDirection?: string;
  color?: string;
  padding?: string;
  height?: string;
}

export const Section = styled.section<ISection>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || 'column'};
  color: ${(props) => props.color || 'inherit'};
  max-width: 1440px;
  padding: ${(props) => props.padding || '0 80px 48px 80px'};
  margin: auto;
  font-size: 16px;
  height: ${(props) => `${props.height}`};

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

export const Text = styled.p<{
  fontSize: string;
  fontWeight: number;
  color: string;
  padding?: string;
}>`
  ${(props) =>
    `font-size: ${props.fontSize};
    font-weight: ${props.fontWeight};
    color: ${props.color};
    margin: 0;
    padding: ${props.padding};`}
`;

export const Breadcrumbs = styled.div`
  margin-bottom: 40px;
  a {
    text-decoration: none;
    color: grey;
    font-weight: normal;
  }
  span:before {
    content: '/';
    margin: auto 8px;
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
  overflow-x: hidden;
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

export const CreatedBy = styled.p`
  font-size: 15px;
  color: #7c7c7c;
  font-weight: 500;
  margin: 0;
`;

export const CreatorName = styled(Link)`
  font-size: 15px;
  text-decoration: none;
  color: white;
  font-weight: 500;
  margin: 0;
  padding-left: 5px;
  &&::after {
    /* content: '/'; */
    margin-right: 8px;
    margin-left: 8px;
    cursor: pointer;
    font-weight: normal;
    color: #7c7c7c;
  }
`;

export const NotifyIconImg = styled.img`
  margin-right: 8px;
  vertical-align: middle;
`;

export const NotifyMe = styled(Link)`
  font-size: 15px;
  text-decoration: none;
  color: white;
  font-weight: 500;
`;

export const Tab = styled.div<{
  selected: boolean;
  theme: Theme;
  themeStyle?: 'light' | 'dark';
}>`
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: ${(props) => (props.selected ? 'black' : '#888888')};
  padding-bottom: 14px;
  border: none;
  border-bottom: ${(props) =>
    props.selected ? '2px solid black' : '2px solid #ebebeb'};
  position: relative;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
`;

export const Padding = styled.div`
  padding-left: 32px;
  border-bottom: 2px solid #2e2e2e;
`;

export const ContainerSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 62%;
  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

export const ContainerTabs = styled.div`
  display: flex;
  flex-direction: row;
  /* width: 100%; */
  ::after {
    content: '';
    border-bottom: 2px solid #ebebeb;
    width: 100%;
  }
`;

export const ContainerDisplayTabs = styled.div`
  display: flex;
  flex: 1;
  margin-top: 20;
  width: 100%;
  flex-direction: column;
`;

export const DownArrow = styled(KeyboardArrowDownIcon)`
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const UpArrow = styled(KeyboardArrowUpIcon)`
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const ToggleArrow = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
`;
