import styled from 'styled-components/macro';
import MuiDivider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';

export const CloseButton = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`;

export const Body = styled.div`
  padding: 40px;
  width: 410px;
  @media screen and (max-width: 960px) {
    width: 100%;
    height: 100vh;
    padding: 40px 0;
  }
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  font-weight: 600;
`;

export const Title = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: 20px;
`;

export const ContainerSubtitle = styled.div`
  text-align: 'center';
`;

export const SubTitle = styled.p`
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #12c95f;
`;

export const StyledMuiDivider = styled(MuiDivider)`
  margin: 15px 0;
`;

export const Detail = styled.div`
  display: grid;
  grid-gap: 10px;
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: black;
  align-items: center;
`;

export const IssuerName = styled.p`
  font-size: 15px;
  color: #9e9e9e;
  font-weight: 600;
`;

export const SkuName = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  width: 100%;
`;

export const ContainerSizeReedemable = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Size = styled.p`
  margin: 0;
  font-size: 16px;
  color: black;
`;

export const Redeemable = styled.p<{ disabled?: boolean }>`
  margin: 0;
  font-size: 16px;
  color: ${props => props.disabled ? '#9e9e9e' : '#000000'};
 
`;

export const SerialNum = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: black;
`;

export const SeriesName = styled.p`
  font-size: 16px;
  color: #9e9e9e;
  font-weight: 600;
  padding-right: 10px;
  line-height: 20px;
  font-style: normal;
  font-weight: normal;
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

export const ContainerInfoText = styled.div`
  width: 100%;
  background: rgb(242, 242, 242);
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  margin-bottom: 10px;
`;
export const InfoText = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 28px;
  text-align: center;
  color: #919191;
`;

export const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Check = styled(Checkbox)`
  .Mui-checked {
    color: black;
  }
  .Mui-checked:hover {
    border: none;
    background: none;
  }
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TermLink = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  margin: 0;
  font-size: 16px;
  margin-left: 10px;
  border-bottom: 1px solid black;
  cursor: pointer;
`;

export const Terms = styled.p`
  margin: 0;
  font-size: 16px;
`;
