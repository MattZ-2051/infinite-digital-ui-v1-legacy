import TextField from '@material-ui/core/TextField';
import Button from 'components/Buttons';
import styled from 'styled-components';

export const BackgroundContainer = styled.div`
  background: #ddf874;
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 460px;
  background: #ddf874;
  max-width: 1140px;
  margin: auto;
  @media screen and (max-width: 1100px) {
    padding: 0 24px;
  }
`;

export const Header = styled.span`
  font-size: 64px;
  font-style: normal;
  font-weight: 600;
  color: black;
  text-align: center;
  @media screen and (max-width: 1100px) {
    font-size: 32px;
  }
`;

export const ContainerHubspot = styled.div`
  background: red;
  width: 410px;
  margin-top: 20px;
`;

export const SubHeader = styled.span<{ color: string; margin: string }>`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  opacity: 0.72;
  color: ${(props) => `${props.color}`};
  margin: ${(props) => `${props.margin}`};
`;
export const EmailInput = styled(TextField)<{
  isDisabled: boolean | undefined;
}>`
  width: 410px;
  opacity: ${(props) => (props.isDisabled ? '0.25' : '1')};
  pointer-events: ${(props) => (props.isDisabled ? 'none' : 'initial')};
  color: ${(props) => (props.isDisabled ? 'grey' : 'white')};
  div {
    color: black;
  }
  input {
    text-align: center;
  }
  && .MuiInput-underline:not(.Mui-error)::before {
    border-color: #4a4a4a;
  }
  && .MuiInput-underline:not(.Mui-error)::after {
    border-color: #fff;
  }

  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;

export const SubscribeButton = styled(Button)`
  margin-top: 32px;
  margin-bottom: 240px;
  &.MuiButton-root {
    min-width: 410px;
    :hover {
      background: #ddf874;
      color: black;
    }
    @media screen and (max-width: 700px) {
      min-width: 100%;
    }
  }
`;
