import styled, { css } from 'styled-components/macro';
import MuiButton from '@material-ui/core/Button';
import MuiIconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Link } from 'react-router-dom';

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
    <>
      {type === 'button' && (
        <Button {...rest} color={color} variant="contained" endIcon={<ArrowForwardIosIcon />}>
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
        <>
          <IconButton color={color} {...rest} radius={radius}>
            <Icon />
          </IconButton>

        </>
      )}

      {type === 'iconLink' && (
        <>
          <IconLinkDiv>
            <IconLinkTag href="/marketplace">
              <IconLinkText>See More</IconLinkText>
              <IconLinkButton color={color} {...rest} radius={radius} >
                <Icon />
              </IconLinkButton>
            </IconLinkTag>
          </IconLinkDiv>
        </>
      )}
    </>
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
  font-size: 14px
`;


// IconButton
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

const Button = styled(({ color, ...rest }) => <MuiButton {...rest} />)`
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

const LinkButtonGrey = css`
  color: var(--grey-40);
  &:hover {
    color: white;
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
      case 'grey':
        return LinkButtonGrey;
      default:
        return LinkButtonBlack;
    }
  }};
  }
`;

export default ButtonComponent;
