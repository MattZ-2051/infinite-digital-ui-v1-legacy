import TextField from '@material-ui/core/TextField';
import Button from 'components/Buttons';
import styled from 'styled-components/macro';

export const Container = styled.div`
  positioin: absolute;
  width: 410px;
  height: 100%;
  background-color: white;
  outline: none;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate-50%-50%;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
`;

export const SubHeader = styled.span`
  padding-left: 20px;
  padding-right: 20px;
  font-size: 14px;
  color: #7d7d7d;
  font-weight: 700;
  line-height: 160%;
  text-align: center;
`;
export const Border = styled.span`
  height: 20px;
  width: 77%;
  border-bottom: 1px solid black;
`;

export const Icon = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Header = styled.div`
  width: 100%;
  margin-top: 11px;
  padding-bottom: 24px;
  margin-bottom: 24px;
  font-size: 22px;
  font-weight: 400;
  text-align: center;
  border-bottom: 1px solid #ebebeb;
`;

export const CheckIcon = styled.div`
  padding-left: 8px;
  display: flex;
  align-items: center;
  width: 30px;
`;

export const ExitIconImg = styled.img`
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const CheckIconImg = styled.img`
  height: fit-content;
`;

export const Body = styled.div`
  width: 100%;
`;

export const SubscribeButton = styled(Button)`
  width: 330px;
  height: 56px;
  font-size: 18px;
  font-weight: 600;
  background-color: black;
  border-radius: 35px;
  color: white;
  border: none;
  :hover {
    cursor: pointer;
    transform: scale(1.025);
  }
  :focus {
    outline: none;
  }
  &.MuiButton-root {
    width: 100%;
  }
`;

export const NotifyIconImg = styled.img`
  margin-right: 8px;
  vertical-align: middle;
`;

export const EmailInput = styled(TextField)`
  height: 50px;
  margin-top: 40px;
  margin-bottom: 20px;
  width: 100%;
  input {
    text-align: center;
  }
  && .MuiInput-underline:not(.Mui-error)::before {
    border-color: ##ebebeb;
  }
  && .MuiInput-underline:not(.Mui-error)::after {
    border: 1px solid #000;
  }
  @media screen and (max-width: 410px) {
    width: 80%;
  }
`;
