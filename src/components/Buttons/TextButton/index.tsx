import styled, { css } from 'styled-components/macro';
import MuiButton from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

export interface IProps {
  children?: string;
  color?: 'white' | 'black' | 'grey';
  to?: string;
  [rest: string]: any;
}

const ButtonComponent = ({
  children,
  color,
  to,
  ...rest
}: IProps) => {
  return (
    <TextButton
      component={Link}
      to={to}
      color={color}
      {...rest}
    >
      {children}
    </TextButton>
  );
};

const TextButtonWhite = css`
  color: white;
  &:hover {
    color: var(--grey-40);
  }
`;

const TextButtonBlack = css`
  color: black;
  &:hover {
    color: var(--grey-40);
  }
`;

const TextButtonGrey = css`
  color: var(--grey-40);
  &:hover {
    color: white;
  }
`;

const TextButton = styled(({ color, size, ...rest }) => <MuiButton {...rest} />)`
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
        return TextButtonBlack;
      case 'white':
        return TextButtonWhite;
      case 'grey':
        return TextButtonGrey;
      default:
        return TextButtonBlack;
    }
  }};
  }
`;

export default ButtonComponent;
