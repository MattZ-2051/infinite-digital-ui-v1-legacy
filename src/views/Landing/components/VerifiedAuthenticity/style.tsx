import styled from 'styled-components/macro';
import { ReactComponent as AppStoreLogo } from 'assets/svg/logos/app-store.svg';

export const Container = styled.section`
  background-color: #fff;
  padding-top: 185px;
  padding-bottom: 185px;
  padding-left: 12vw;
  padding-right: 12vw;
  overflow: hidden;

  h2 {
    font-size: 18px;
    font-weight: 700;
    line-height: 32px;
    letter-spacing: -1%;
    color: #9da1a8;
  }

  h3 {
    font-size: 48px;
    font-weight: 700;
    line-height: 56px;
    letter-spacing: -3%;
    color: #000;
  }

  h4 {
    font-size: 16px;
    font-weight: 500;
    line-height: 26px;
    color: #000;
  }

  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    color: #7c7c7c;
  }
`;

export const BlockGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 520px;
  grid-template-rows: repeat(3, auto);
  column-gap: min(24px, 8%);
  row-gap: 24px;

  header,
  .block__action {
    grid-column: 2;
    grid-row: auto / span 1;
    position: relative;
  }
  .block__img {
    grid-column: 1;
    grid-row: 1 / span 3;
  }

  @media screen and (max-width: 1280px) {
    grid-template-columns: 1fr;
    column-gap: 0;
    row-gap: 32px;

    header,
    .block__action,
    .block__store {
      grid-column: 1 / span 1;
      text-align: center;
      margin-left: auto;
      margin-right: auto;
    }

    .block__img {
      grid-column: 1;
      grid-row: 2 / span1;
    }
    .block__action {
      grid-row: auto;
    }
  }
`;

export const Header = styled.header`
  margin-top: auto;
  > * + * {
    margin-top: 16px;
  }
`;

export const Action = styled.section`
  > p {
    margin: 0;
    max-width: 52ch;
  }
  > * + * {
    margin-top: 32px;
  }
`;

export const ImgBlock = styled.div`
  position: relative;
  width: 100%;
  max-width: 764px;
  height: 100%;
  min-height: 564px;
  margin-left: auto;
  margin-right: auto;

  > img {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: relative;
  }

  > .img__phone {
    width: min(774px, 180%);
    height: auto;
  }
`;

export const Stores = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  row-gap: 16px;

  @media screen and (max-width: 1280px) {
    justify-content: center;
  }
`;

export const AppStore = styled(AppStoreLogo)`
  height: 48px;
  width: auto;
`;
