import styled from 'styled-components/macro';
import { ReactComponent as YFinanceLogo } from 'assets/svg/logos/yahoo-finance.svg';
import { ReactComponent as CoindeskLogo } from 'assets/svg/logos/coindesk.svg';
import { ReactComponent as ForbesLogo } from 'assets/svg/logos/forbes.svg';

export const Container = styled.section`
  background-color: #000;
  padding-top: 340px;
  padding-bottom: 340px;
  padding-left: 12vw;
  padding-right: 12vw;
  overflow: hidden;

  h2 {
    font-size: 18px;
    font-weight: 700;
    line-height: 32px;
    letter-spacing: -0.01em;
    color: #9da1a8;
  }

  h3 {
    font-size: 48px;
    font-weight: 700;
    line-height: 56px;
    letter-spacing: -0.03em;
    color: #fff;
  }

  h4 {
    font-size: 16px;
    font-weight: 500;
    line-height: 26px;
    color: #fff;
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
  grid-template-columns: minmax(auto, 710px) 520px;
  grid-template-rows: repeat(3, auto);
  column-gap: min(112px, 8%);
  row-gap: 24px;
  margin-left: auto;
  margin-right: auto;

  header,
  .block__action,
  .block__features {
    grid-column: 1;
    grid-row: auto / span 1;
  }
  .block__img {
    grid-column: 2;
    grid-row: 1 / span 3;
  }

  @media screen and (max-width: 1400px) {
    .block__features {
      grid-column: auto / span 2;
    }
  }

  @media screen and (max-width: 1280px) {
    grid-template-columns: 1fr;
    column-gap: 0;
    row-gap: 32px;

    * {
      grid-column: auto / span 1;
      text-align: center;
      margin-left: auto;
      margin-right: auto;
    }

    .block__img {
      grid-column: 1;
      grid-row: 2 / span3;
    }
    .block__action {
      grid-row: 5;
    }
  }
`;

export const Header = styled.header`
  margin-top: auto;
  max-width: 58ch;
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
  max-width: 520px;
  max-height: 590px;
  width: 100%;
  height: 100%;
  padding: 56px;
  padding-bottom: 0;
  background-color: #1c1c1c;
  border-radius: 18px;

  > img {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
  }

  > .img__landing__frame {
    top: unset;
    bottom: 0;
    position: relative;
    width: 100%;
    height: 100%;
  }

  > .img__shoot {
    top: unset;
    bottom: 0;
    transform: translate(-162%, 18px);
  }

  > .img__shoes {
    transform: translate(5%, -40%);
  }

  @media screen and (max-width: 700px) {
    > .img__shoot {
      top: unset;
      bottom: 0;
      transform: translate(-162%, 18px);
      height: 100%;
      width: auto;
    }

    > .img__shoes {
      transform: translate(5%, -40%);
      height: 50%;
      width: auto;
    }
  }
`;

export const ImgFrame = styled.div`
  --n: 534;
  --d: 407;
  padding-bottom: calc(var(--n) / var(--d) * 100%);
  position: relative;

  > * {
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > img,
  > video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ActionButton = styled.a`
  border: solid thin #3a3a3a;
  background-color: #000;
  border-radius: 40px;
  padding: 18px 40px;

  color: #fff;
  font-size: 16px;
  line-height: 100%;
  font-weight: 700;
  text-align: center;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;

  :hover,
  :focus {
    border: solid thin #ddf874;
    background-color: #ddf874;
    color: #000;
  }
  :active {
    border: solid thin #ddf874;
    background-color: #ddf874;
    color: #000;
  }
`;

export const Featured = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  column-gap: min(40px, 8%);
  row-gap: 16px;

  h4 {
    flex-basis: 100%;
  }
  a {
    color: rgba(255, 255, 255, 0.28);
  }

  a:hover {
    color: rgba(255, 255, 255, 1);
  }
`;

export const Forbes = styled(ForbesLogo)`
  fill: currentColor;
`;

export const YFinance = styled(YFinanceLogo)`
  fill: currentColor;
`;

export const Coindesk = styled(CoindeskLogo)`
  fill: currentColor;
`;
