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
  overflow: hidden;
  width: calc(100% + 40px);
  img {
    height: 260px;
    object-fit: cover;
    display: block;
    position: absolute;
    width: 100%;
  }
`;

export const Header = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export const DetailRowPrice = styled(DetailRow)`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: #9e9e9e;
  strong {
    font-size: 20px;
    line-height: 25px;
    text-align: right;
    color: #000000;
  }
`;

export const Footer = styled.div`
  text-align: center;
  margin-top: 25px;
  color: #9e9e9e;
  font-size: 16px;
  p {
    line-height: 22px;
    strong {
      display: block;
      color: #000000;
    }
  }
`;

export const Title = styled.h3`
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  font-size: 22px;
  text-align: center;
  letter-spacing: -1px;
  line-height: 28px;
  margin-bottom: 8px;
`;

export const SubTitle = styled.h5`
  color: #9e9e9e;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  max-width: 330px;
`;

export const Rarity = styled.div`
  color: #00eb7c;
  font-size: 15px;
  display: flex;
  align-items: center;

  span {
    background: linear-gradient(41.72deg, #00eb7c -14.01%, #11d6ec 90.62%);
    width: 12px;
    height: 12px;
    display: block;
    margin-right: 5px;
    border-radius: 50%;
  }
`;

export const ModalContainer = styled.div`
  max-width: 330px;
  flex: 1;
`;
