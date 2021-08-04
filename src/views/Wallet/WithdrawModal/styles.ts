import styled from 'styled-components/macro';
import LoadingButton from 'components/Buttons/LoadingButton';
import CurrencyInput from 'react-currency-input-field';

export const BodyContainer = styled.div`
  position: absolute;
  max-width: 550px;
  width: 500px;
  max-height: 650px;
  background-color: white;
  padding-top: 16px;
  outline: none;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;
export const ContainerBalance = styled.div`
  display: flex;
  align-items: center;
`;


export const DepositFormContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  flex: 1;
  align-items: center;
  padding-top: 40px;
`;

export const Text = styled.p<{
  color: string;
  fontSize: string;
  fontWeight: number;
  textAlign?: string;
  padding?: string;
}>`
  ${(props) =>
    `font-size: ${props.fontSize};
  font-weight: ${props.fontWeight};
  color: ${props.color};
  text-align: ${props.textAlign};
  padding: ${props.padding};
  margin: 0;
  display: inline;
  `}
`;

export const BankImg = styled.img<{ backgroundColor: string }>`
  border-radius: 100%;
  height: 48px;
  margin-right: 25px;
  background-color: ${(props) => props.backgroundColor};
`;

export const BodyContent = styled.div`
  padding: 0 40px 40px 40px;
  flex: 1,
  justify-content: space-between,
  display: flex,
  flex-direction: column,
  @media screen and (max-width: 550px) {
    padding: 0 10px;
  }
`;

export const GrayLine = styled.div`
  border-bottom: 2px solid #d8d8d8;
  padding-top: 12px;
  width: 80%;
`;

export const Header = styled.span`
  font-size: 22px;
  font-weight: 600;
  padding-bottom: 14px;
  display: flex;
  flex:1;
  margin-left:15px;
`;

export const ContainerHeader = styled.div`
 display: flex;
 flex: 1; 
 border-bottom: 2px solid black;
`

export const Row = styled.div`
  display: grid;
  grid-template-columns: 15% 55% 30%;
  padding-top: 40px;
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 21px;
  :hover {
    border-bottom: 1px solid black;
    cursor: pointer;
  }
  .icon__arrow {
    color: #9e9e9e;
  }
  :hover .icon__arrow {
    color: black;
  }
  .icon__delete {
    color: #9e9e9e;
  }
  :hover .icon__delete {
    color: black;
  }
`;

export const ExitIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 16px;
  :hover .icon__exit {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const AddAccountButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
`;

export const Button = styled.button<{ error?: string }>`
  min-height: 56px;
  width: 100%;
  border: none;
  background-color:${props => props.error ? '#DDDDDD' : '#000000'};
  font-size: 20px;
  font-weight: 600;
  border-radius: 35px;
  color: white;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
`;

export const StyledLoadingButton = styled(LoadingButton)`
  min-height: 56px;
  width: 100%;
  border: none;
  background-color: black;
  font-size: 20px;
  font-weight: 600;
  border-radius: 35px;
  color: white;
  margin-bottom: 32px;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
`;

export const SubButton = styled.button`
  width: 100%;
  border: none;
  background-color: white;
  font-size: 20px;
  font-weight: 600;
  border-radius: 35px;
  color: black;
  margin-top: 32px;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
`;

export const NoButton = styled.button`
  min-height: 56px;
  width: 100%;
  background-color: white;
  font-size: 20px;
  font-weight: 600;
  border: 2;
  border-color: black;
  border-radius: 35px;
  color: black;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
`;

export const AmountContainer = styled.div<{ error?: string }>`
  width: 100%;
  padding: 17px 24px;
  border-radius: 35px;
  background-color: #f8f8f8;
  margin-bottom: ${(props) => props.error ? '5px' : '32px'};
  margin-top: 16px;
`;

export const AmountInput = styled(CurrencyInput) <{ error?: string }>`
  color: ${(props) => props.error ? '#DD2828' : '#000000'};
  width: 100%;
  border: none;
  border-radius: 35px;
  background-color: transparent;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  :focus {
    outline: none;
  }
  :: placeholder { 
    color: ${props => props.error ? '#DD2828' : '#888888'}
  }
`;

export const DollarSign = styled.span <{ error?: string }>`
color: ${(props) => props.error ? '#DD2828' : '#7d7d7d'};
font-size: 20px;
padding-right: 10px;
font-weight: 700;
position: absolute;
`;

export const InputContainer = styled.div<{ error?: string }>`
display: flex;
justify-content: center;
align-items: center;
margin: 15px auto 22px;
margin: ${(props) => props.error ? '5px' : '15px auto 22px'};
flex: 1;
width: 100%;
`;

export const CustomTextField = styled.input<{ error?: string }>`
width: 100%;
height: 56px;
background: #f8f8f8;
border-radius: 35px;
border: none;
outline: none;
font-family: Circular, sans - serif;
font-style: normal;
font-weight: 700;
font-size: 20px;
color: ${props => props.error ? '#DD2828' : '#000000'};
  :: placeholder { 
  color: ${props => props.error ? '#DD2828' : '#888888'}
}
text-align: center;
`;