import styled, {css} from 'styled-components/macro';
import MuiIconButton from '@material-ui/core/IconButton';

export interface IProps {
  children?: string;
  type: 'button' | 'icon' | 'link' | 'iconLink';
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
    <IconLinkDiv>
      <IconLinkTag href="/marketplace">
        <IconLinkText>See More</IconLinkText>
        <IconLinkButton color={color} {...rest} radius={radius}>
          <Icon />
        </IconLinkButton>
      </IconLinkTag>
    </IconLinkDiv>
  );
};

// Icon Link Button with Text
const IconLinkTag = styled.a`
  text-decoration: none;
`;

const IconLinkDiv = styled.div`
  padding-top: 40px;
`;

const IconLinkText = styled.span`
  padding-right: 10px;
  font-weight: 600;
  font-size: 14px;
`;

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

const IconLinkButton = styled(({ color, radius, ...rest }) => <MuiIconButton {...rest} />)`
&& {
  height: 40px;
  width: 40px;
  border-radius: ${(props) => (props.radius ? `${props.radius}px` : '50%')};

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

export default ButtonComponent;
