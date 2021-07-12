import TextField from '@material-ui/core/TextField';
import Button from 'components/Buttons';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 460px;
  background: #111113;
`;

export const Tagline = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: #8e8e8e;
  margin-bottom: 8px;
  text-align: center;
  @media screen and (max-width: 410px) {
    margin-left: 24px;
    margin-right: 24px;
  }
`;

export const Header = styled.span`
  font-size: 35px;
  font-weight: 700;
  text-align: center;
  background: linear-gradient(#ff9412, #fff72d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media screen and (max-width: 410px) {
    margin-left: 24px;
    margin-right: 24px;
  }
`;
export const EmailInput = styled(TextField)`
  margin-top: 40px;
  margin-bottom: 13px;
  width: 410px;
  color: white;
  div {
    color: white;
  }
  && .MuiInput-underline:not(.Mui-error)::before {
    border-color: #4a4a4a;
  }
  && .MuiInput-underline:not(.Mui-error)::after {
    border-color: #fff;
  }
  @media screen and (max-width: 410px) {
    width: 80%;
  }
`;

export const SubscribeButton = styled(Button)`
  &.MuiButton-root {
    min-width: 410px;
    @media screen and (max-width: 410px) {
      min-width: 80%;
    }
  }
`;
