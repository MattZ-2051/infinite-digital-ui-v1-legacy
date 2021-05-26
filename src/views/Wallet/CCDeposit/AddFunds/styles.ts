import styled from 'styled-components/macro';
import Cards from 'react-credit-cards';
import CurrencyInput from 'react-currency-input-field';
import LoadingButton from 'components/Buttons/LoadingButton';

export const CreditCard = styled(Cards)`
  .rccs__card__background {
    background: black !important;
  }
`;

export const RemoveCCButton = styled.span`
  font-size: 16px;
  color: #7d7d7d;
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const DollarSign = styled.span`
  color: #7d7d7d;
  font-size: 16px;
  padding-right: 10px;
`;

export const AmountInput = styled(CurrencyInput)`
  border: none;
  font-size: 16px;
  :focus {
    outline: none;
  }
`;

export const ActiveText = styled.span`
  color: #00c44f;
  padding-left: 5px;
`;

export const AmountContainer = styled.div`
  padding-top: 25px;
  border-bottom: 2px solid #ebebeb;
  padding-bottom: 10px;
`;

export const CardContainer = styled.div`
  padding: 25px 0;
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

export const FeeReminderIconContainer = styled.div`
  margin: 10px auto;
`;

export const HeaderText = styled.span`
  font-size: 22px;
  padding-left: 18px;
  font-weigth: 600;
`;

export const HeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  font-weigth: 600;
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
  font-weigth: 600;
  :focus {
    outline: none;
  }
  @media screen and (max-width: 430px) {
    width: 100%;
  }
`;
