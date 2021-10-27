import styled from 'styled-components/macro';

export const BackgroundContainer = styled.div`
  background: black;
`;

export const Container = styled.div`
  max-width: 1440px;
  margin: auto;
  padding-top: 8.75rem;
  padding-bottom: 0rem;
  @media screen and (max-width: 1140px) {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    padding-top: 8rem;
  }
`;

export const WhiteText = styled.p<{ fontSize: string }>`
  font-size: ${(props) => `${props.fontSize}`};
  color: white;
  font-weight: 400;
  margin: 0;
  text-align: center;
`;

export const GreenText = styled.p`
  font-size: 24px;
  color: #ddf874;
  font-weight: 400;
  text-align: center;
  margin: 0;
`;

export const DarkGreyText = styled.p`
  color: #7c7c7c;
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  text-align: center;
`;

export const GreyItalicText = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  color: rgba(255, 255, 255, 0.4);
  font-style: italic;
  text-align: center;
  @media screen and (max-width: 640px) {
    font-size: 12px;
  }
`;

export const TextContainer = styled.div<{ padding: string }>`
  padding: ${(props) => `${props.padding}`};
`;

export const AboutTileContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 4rem;
  @media screen and (max-width: 1140px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 0;
  }
`;
