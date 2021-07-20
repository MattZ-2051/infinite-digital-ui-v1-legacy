import styled from 'styled-components/macro';
import MuiDivider from '@material-ui/core/Divider';

export const CloseButton = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
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
  padding-top: 20px;
`;

export const Detail = styled.div`
  display: grid;
  grid-gap: 8px;
`;

export const Body = styled.div`
  padding: 20px;
  width: 410px;
  @media screen and (max-width: 960px) {
    width: 100%;
    height: 100vh;
    padding: 40px 0;
  }
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: black;
  align-items: center;
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
  font-weight: 600;
  font-size: 22px;
  text-align: center;
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

export const SkuName = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  width: 100%;
`;

export const SeriesName = styled.p`
  font-size: 16px;
  color: #9e9e9e;
  font-weight: 600;
  padding-right: 10px;
  font-style: normal;
  font-weight: 500;
`;

export const Redeemable = styled.span`
  margin: 0;
  font-size: 16px;
  color: black;
  font-weight: 500;
`;

export const IssuerName = styled.p`
  font-size: 15px;
  color: #9e9e9e;
  font-weight: 600;
  margin: 0;
`;

export const ModalContainer = styled.div``;

export const StyledMuiDivider = styled(MuiDivider)`
  margin: 20px 0;
`;

export const InputContainer = styled.div`
  margin: 31px auto 22px;
  width: 100%;
`;
