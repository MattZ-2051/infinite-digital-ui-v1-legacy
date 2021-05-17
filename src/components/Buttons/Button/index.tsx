import styled, { css } from 'styled-components/macro';
import MuiButton from '@material-ui/core/Button';

export interface IProps {
  children?: string | null | false | any; //TODO: remove any
  color?: string;
  [rest: string]: any;
}

const Button = ({ children, color, ...rest }: IProps) => {
  return (
    <StyledButton
      {...rest}
      color={color}
      // endIcon={<ArrowForwardIosIcon />}
    >
      {children}
    </StyledButton>
  );
};

const ButtonWhite = css`
  background-color: #ffffff;
  color: #000000;
  &:hover {
    background-color: var(--grey-40);
    color: #ffffff;
    cursor: pointer;
  }
`;

const ButtonBlack = css`
  background-color: #000000;
  color: #ffffff;
  &:hover {
    background-color: var(--grey-40);
    cursor: pointer;
  }
`;

const StyledButton = styled(({ color, ...rest }) => <MuiButton {...rest} />)`
  && {
    height: 40px;
    background-color: black;
    box-shadow: none;
    color: white;
    font-weight: 600;
    padding: 10px 24px 10px 24px;
    font-size: 1rem;
    width: max-content;
    border-radius: 20px;
    text-transform: none;

    &:hover {
      box-shadow: none;
      background-color: var(--grey-40);
      cursor: pointer;
    }
    .MuiSvgIcon-root {
      font-size: 15px;
    }

    ${(props) => {
      switch (props.color) {
        case 'black':
          return ButtonBlack;
        case 'white':
          return ButtonWhite;
        default:
          return ButtonBlack;
      }
    }};
  }
`;

export default Button;
