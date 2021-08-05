import styled from 'styled-components/macro';
import CurrencyInput from 'react-currency-input-field';
import LoadingButton from 'components/Buttons/LoadingButton';
import TextField from '@material-ui/core/TextField';

export const RemoveCCButton = styled.span`
  font-size: 16px;
  color: #7d7d7d;
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const DollarSign = styled.span`
  color: #7c7c7c;
  font-size: 20px;
  position: absolute;
  left: 32px;
`;

export const AmountInput = styled(CurrencyInput)`
  border: none;
  font-size: 16px;
  :focus {
    outline: none;
  }
  background-color: unset;
  color: #9da1a8;
  opacity: 0.9;
  font-size: 20px;
  line-height: 22px;
  font-family: Circular, sans-serif;
  text-align: center;
`;

export const ActiveText = styled.span<{ statusStr: string }>`
  color: ${(props) =>
    props.statusStr === 'Active'
      ? '#00c44f'
      : props.statusStr === 'Pending'
      ? '#7d7d7d'
      : '#e74c3c'};
  padding-left: 5px;
`;

export const AmountContainer = styled.div`
  padding: 17px 32px;
  background-color: #efefef;
  border: 0;
  border-radius: 28px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const CardContainer = styled.div`
  padding: 25px 0;
  .rccs {
    width: min(302px, 100%);
  }
  .rccs__card {
    width: min(302px, 100%);
  }
  .rccs__card__background {
    background: black;
  }
  .rccs__number {
    color: white;
    font-family: Circular, 'Consolas', 'Courier', monospace;
    font-size: 20px;
    line-height: 25px;
    opacity: 1;
    top: 38%;
  }
  .rccs__number:before {
    content: 'Card number';
    display: block;
    text-transform: uppercase;
    font-size: 10px;
    line-height: 13px;
    color: #9e9e9e;
  }
  .rccs__expiry {
    bottom: 12%;
    right: 12%;
    .rccs__expiry__valid {
      font-family: Circular, 'Consolas', 'Courier', monospace;
      font-size: 10px;
      line-height: 13px;
      text-transform: uppercase;
      color: #9e9e9e;
    }
    .rccs__expiry__value {
      font-family: Circular, 'Consolas', 'Courier', monospace;
      font-size: 16px;
      line-height: 20px;
      opacity: 1;
      color: white;
    }
  }
`;

export const AddFundsText = styled.span`
  font-size: 16px;
  color: #7d7d7d;
`;

export const FeeReminderContainer = styled.div`
  margin: 24px auto 20px;
  text-align: center;
`;

export const FeeReminderText = styled.div`
  color: #9e9e9e;
`;

export const HeaderText = styled.span`
  font-size: 22px;
  padding-left: 18px;
  font-weight: 600;
`;

export const HeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ExitIcon = styled.img`
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const ContentContainer = styled.div`
  width: 410px;
  margin: auto;
  @media screen and (max-width: 430px) {
    width: 300px;
    height: 100vh;
    padding-top: 30px;
    overflow: auto;
  }
`;

export const AddFundsButton = styled(LoadingButton)`
  width: 410px;
  height: 56px;
  border: none;
  background-color: black;
  color: white;
  border-radius: 35px;
  font-size: 20px;
  font-weight: 600;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
  @media screen and (max-width: 430px) {
    width: 100%;
  }
`;

export const InactiveButton = styled.button`
  width: 410px;
  height: 56px;
  border: none;
  background-color: #9e9e9e;
  color: white;
  border-radius: 35px;
  font-size: 20px;
  font-weight: 600;
  :focus {
    outline: none;
  }
  @media screen and (max-width: 430px) {
    width: 100%;
  }
`;

export const FormInput = styled(TextField)`
  & .MuiInputBase-input.MuiInput-input {
    text-align: center;
  }
`;

// export const FormInput = styled.input`
// `;
