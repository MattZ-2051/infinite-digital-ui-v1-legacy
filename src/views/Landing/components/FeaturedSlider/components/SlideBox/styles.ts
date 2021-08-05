import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  height: 100%;
  max-width: 1440px;
  padding: 0 50px 0 50px;
  display: flex;
  align-items: center;
  margin: auto;

  @media screen and (max-width: 960px) {
    flex-direction: column;
    height: auto;
    padding: 24px 24px 24px 24px;
    justify-content: center;
  }
`;

export const MediaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 630px;
  background-repeat: no-repeat;
  background-position: center;
  width: 630px;
  background-size: contain;
  margin: auto;
  margin-right: 24px;

  img {
    width: 100%;
    height: auto;
  }

  @media screen and (max-width: 960px) {
    height: 80vw;
    width: 80vw;
    img {
      width: 100%;
      height: auto;
    }
  }

  @media screen and (max-width: 660px) {
    margin: auto;
    width: 100%;
  }
`;

export const Video = styled.video`
  width: 100%;
  @media screen and (max-width: 960px) {
    width: 70%;
  }
`;

export const ProductDetails = styled.div`
  display: inline-grid;
  grid-gap: 32px;
  height: auto;
  font-weight: 600;
  width: 50%;

  @media screen and (max-width: 960px) {
    min-width: 100%;
    font-size: 0.85rem;
    grid-gap: 10px;
    min-height: 320px;
    padding-left: 5%;
  }

  p {
    margin: 0;
  }
`;

export const Issuer = styled.div`
  font-size: 22px;
  color: #8e8e8e;
  display: flex;
  align-items: baseline;
`;

export const ProductName = styled.h3`
  font-size: 42px;

  @media screen and (max-width: 960px) {
    font-size: 32px;
  }
`;

export const Series = styled.small`
  font-size: 1rem;
`;

export const TotalSupply = styled.div``;

export const Epic = styled.span`
  background: linear-gradient(41.72deg, #00eb7c -14.01%, #11d6ec 90.62%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-left: 32px;
`;

export const ViewDetails = styled(Link)`
  text-decoration: none;
  margin-top: 40px;
`;

export const ViewMore = styled(Link)`
  color: white;
  font-weight: 400;
`;

export const CreatedBy = styled.div`
  font-weight: 400;
`;

export const IssuerName = styled.span`
  font-weight: 600;
  margin: 0 10px 0 10px;
`;
