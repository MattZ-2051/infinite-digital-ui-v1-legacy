import styled from 'styled-components/macro';
import { ReactComponent as YFinanceLogo } from 'assets/svg/logos/yahoo-finance.svg';
import { ReactComponent as CoindeskLogo } from 'assets/svg/logos/coindesk.svg';
import { ReactComponent as ForbesLogo } from 'assets/svg/logos/forbes.svg';

export const MainContainer = styled.div`
  background-color: black;
  display: flex;
  justify-content: center;
  padding: 1.63rem;
  padding-top: 0rem;
  padding-bottom: 10rem;
  @media (max-width: 900px) {
    padding-top: 2.5rem;
    padding-bottom: 3.5rem;
  }
`;

export const Featured = styled.section``;

export const Brands = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 3.25rem;
  row-gap: 1.6rem;
  @media (max-width: 450px) {
    column-gap: 1rem;
  }
`;
export const BrandLink = styled.div`
  a {
    display: flex;
    justify-content: center;
    color: rgba(255, 255, 255, 0.28);
  }

  a:hover {
    color: rgba(255, 255, 255, 1);
  }
`;

export const Title = styled.div`
  flex-basis: 100%;
  text-align: center;
  color: #7c7c7c;
  line-height: 1.6rem;
  margin-bottom: 3.25rem;

  @media (max-width: 542px) {
    margin-bottom: 1.25rem;
  }
`;

export const Forbes = styled(ForbesLogo)`
  fill: currentColor;
  width: 100%;
  height: 100%;
`;

export const YFinance = styled(YFinanceLogo)`
  fill: currentColor;
  width: 100%;
  height: 100%;
`;

export const Coindesk = styled(CoindeskLogo)`
  fill: currentColor;
  width: 100%;
  height: 100%;
`;
