import styled, { css } from 'styled-components/macro';
import MuiIconButton from '@material-ui/core/IconButton';

export interface IProps {
  children?: string;
  type: 'button' | 'icon' | 'link';
  color?: 'white' | 'black' | 'grey';
  radius?: number;
  icon?: any;
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
      <IconButton color={color} {...rest} radius={radius}>
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

const IconButton = styled(({ color, radius, ...rest }) => <MuiIconButton {...rest} />)`
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
        default:
          return ButtonBlack;
      }
    }};
  }
`;

export default ButtonComponent;
