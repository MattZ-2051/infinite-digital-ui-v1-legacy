import styled from 'styled-components/macro';

export const CloseButton = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`;

export const ImageContainer = styled.div`
  margin: -20px -20px 0 -20px;
  position: relative;
  height: 254px;
  background-color: grey;
  border-radius: 12px 12px 0 0;
  margin-bottom: 34px;
`;

export const Header = styled.div`
  display: grid;
  grid-gap: 8px;
  text-align: center;
`;

export const Detail = styled.div`
  display: grid;
  grid-gap: 8px;
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Footer = styled.div`
  text-align: center;
`;

export const Title = styled.h3`
  font-size: 20px;
`;

export const Rarity = styled.div`
  color: green;
`;
