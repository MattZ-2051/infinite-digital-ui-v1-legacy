import styled, { css } from 'styled-components/macro';
import MuiButton from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export interface IProps {
  children?: string;
  color?: string;
  [rest: string]: any;
}

const Button = ({
  children,
  color,
  ...rest
}: IProps) => {
  return (
    <StyledButton
      {...rest}
      color={color}
      variant="contained"
      endIcon={<ArrowForwardIosIcon />}
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
  }
`;

const ButtonBlack = css`
  background-color: #000000;
  color: #ffffff;
  &:hover {
    background-color: var(--grey-40);
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

    &:hover {
      box-shadow: none;
      background-color: var(--grey-40);
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
