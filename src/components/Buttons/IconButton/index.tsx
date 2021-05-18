import React from 'react';
import styled, { css } from 'styled-components/macro';
import MuiIconButton from '@material-ui/core/IconButton';

export interface IProps {
  children?: string;
  color?: 'white' | 'black' | 'grey';
  radius?: number;
  icon?: any;
  label?: string;
  size?: 'small' | 'medium' | 'big'; // 24 32 40
  [rest: string]: any;
}

const ButtonComponent = ({
  children,
  icon: Icon,
  label,
  radius,
  size,
  color,
  ...rest
}: IProps) => {
  return (
    <IconButton radius={radius} color={color} size={size} {...rest}>
      <Icon />
    </IconButton>
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

const ButtonGrey = css`
  background-color: #2e2e2e;
  color: #fff;
  &:hover {
    background-color: white;
    color: black;
  }
`;

const IconButton = styled(({ radius, color, size, ...rest }) => (
  <MuiIconButton {...rest} />
))`
  && {
    height: 32px;
    width: 32px;
    border-radius: ${(props) => (props.radius ? `${props.radius}px` : '50%')};

    .MuiSvgIcon-root {
      font-size: 18px;
    }

    ${(props) => {
      switch (props.color) {
        case 'black':
          return ButtonBlack;
        case 'white':
          return ButtonWhite;
        case 'grey':
          return ButtonGrey;
        default:
          return ButtonBlack;
      }
    }};
  }
`;

export default ButtonComponent;
