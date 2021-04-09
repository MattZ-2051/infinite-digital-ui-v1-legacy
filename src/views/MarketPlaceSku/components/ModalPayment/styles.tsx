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
  background-color: #f4f4f4;
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
  color: black;
`;

export const Footer = styled.div`
  text-align: center;
`;

export const Title = styled.h3`
  font-size: 22px;
`;

export const SubTitle = styled.h5`
  font-size: 14px;
  color: #E74C3C;
`;

export const Rarity = styled.div`
 color: #00EB7C;
 font-size: 15px;
 display: flex;
    align-items: center;

 span {
  background: linear-gradient(41.72deg, #00EB7C -14.01%, #11D6EC 90.62%);
   width: 12px;
   height: 12px;
   display: block;
   margin-right: 5px;
   border-radius: 50%;
 }
`;
