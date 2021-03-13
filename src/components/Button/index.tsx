import styled, { css } from 'styled-components/macro';
import MuiButton from '@material-ui/core/Button';
import MuiIconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Link } from 'react-router-dom';

export interface IProps {
  children?: string;
  type?: 'button' | 'icon' | 'link';
  color?: 'white' | 'black';
  radius?: number;
  icon?: any; //TODO: change type
  size?: 'small' | 'medium' | 'big'; // 24 32 40
  to?: string;
  rect?: boolean;
  [rest: string]: any;
}

const ButtonComponent = ({
  children,
  type,
  radius,
  icon: Icon,
  size,
  color,
  to,
  rect,
  ...rest
}: IProps) => {
  return (
    <>
      {type === 'button' && (
        <Button {...rest} variant="contained" endIcon={<ArrowForwardIosIcon />}>
          {children}
        </Button>
      )}

      {type === 'link' && (
        <LinkButton
          component={Link}
          to={to}
          color={color}
          size={size}
          {...rest}
        >
          {children}
        </LinkButton>
      )}

      {type === 'icon' && (
        <IconButton color={color} {...rest}>
          <Icon />
        </IconButton>
      )}
    </>
  );
};

const Button = styled(({ color, ...rest }) => <MuiButton {...rest} />)`
  && {
    height: 40px;
    background-color: black;
    box-shadow: none;
    color: white;
    font-weight: 600;
    padding: 10px 24px 10px 24px;

    &:hover {
      box-shadow: none;
      background-color: var(--grey-40);
    }
    .MuiSvgIcon-root {
      font-size: 15px;
    }
  }
`;

// IconButton
const IconButtonWhite = css`
  background-color: #ffffff;
  color: #000000;
  &:hover {
    background-color: var(--grey-40);
    color: #ffffff;
  }
`;

const IconButtonBlack = css`
  background-color: #000000;
  color: #ffffff;
  &:hover {
    background-color: var(--grey-40);
  }
`;

const IconButton = styled(({ color, ...rest }) => <MuiIconButton {...rest} />)`
  && {
    height: 32px;
    width: 32px;

    .MuiSvgIcon-root {
      font-size: 15px;
    }

    ${(props) => {
      switch (props.color) {
        case 'black':
          return IconButtonBlack;
        case 'white':
          return IconButtonWhite;
        default:
          return IconButtonBlack;
      }
    }};
  }
`;

// LinkButton
const LinkButtonWhite = css`
  color: white;
  &:hover {
    color: var(--grey-40);
  }
`;

const LinkButtonBlack = css`
  color: black;
  &:hover {
    color: var(--grey-40);
  }
`;

const LinkButton = styled(({ color, size, ...rest }) => <MuiButton {...rest} />)`
  && {
    min-width: 0;
    transition: 0.3s;
    padding: 0;
    margin: 0;
    background: none;
    text-transform: none;
    font-size: ${(props) => {
      switch (props.size) {
        case 'small':
          return '12px';
        case 'medium':
          return '1rem';
        case 'big':
          return '18px';
        default:
          return '1rem';
      }
    }};

    ${(props) => {
      switch (props.color) {
        case 'black':
          return LinkButtonBlack;
        case 'white':
          return LinkButtonWhite;
        default:
          return LinkButtonBlack;
      }
    }};
  }
`;

export default ButtonComponent;
