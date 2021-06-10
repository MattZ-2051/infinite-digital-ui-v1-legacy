import styled from 'styled-components/macro';
import MuiDivider from '@material-ui/core/Divider';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import TimePicker from 'components/TimePicker/rc';
import Modal from 'components/Modal';

export const S: any = {};
export const Container = styled.div``;

export const PickerContainer = styled.div`
  width: 45%;
`;

export const CustomDatePicker = styled(KeyboardDatePicker)`
  && {
    .MuiPickersDay-daySelected {
      background-color: black;
    }
  }
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
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
  letter-spacing: 0.02em;
  color: #9e9e9e;
`;

export const SkuInfo = styled.div`
  border-bottom: 1px solid #ebebeb;
  width: 100%;
  padding-bottom: 24px;
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

export const SerialNum = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: black;
`;
// export const SerialNum = styled.p`
//   font-size: 16px;
//   color: #9e9e9e;
//   font-weight: 600;
//   padding-right: 10px;
//   line-height: 20px;
// `;
export const SeriesName = styled.p`
  font-size: 16px;
  color: #9e9e9e;
  font-weight: 600;
  padding-right: 10px;
  line-height: 20px;
  font-style: normal;
  font-weight: normal;
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

export const Redeemable = styled.p`
  margin: 0;
  font-size: 16px;
  color: black;
`;

export const Bar = styled.p`
  margin: 0;
  font-size: 16px;
  color: #9e9e9e;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 31px auto 22px;
  flex: 1;
`;

export const StyledMuiDivider = styled(MuiDivider)`
  margin: 5px 0;
`;

export const Detail = styled.div`
  display: grid;
  grid-gap: 8px;
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
  margin-top: 30px;
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

export const ContainerTextDate = styled.div`
  display: flex;
  width: 100%;
  height: 40;
  justify-content: space-around;
  p {
    font-size: 14px;
  }
`;

export const CustomTimePicker = styled(TimePicker)`
  & {
    .rc-time-picker-input {
      border: none;
      font-size: 18px;
      line-height: 23px;
      color: #000000;
      :focus {
        outline: none;
      }
    }
  }
  margin-top: 20px;
`;
