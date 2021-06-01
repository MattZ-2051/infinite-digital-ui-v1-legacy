import styled from 'styled-components/macro';
import { Link as LinkComponent } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
// Local
import Notification from 'components/Notification';
import NavBar from 'components/Layout/NavBar';
import Footer from 'components/Layout/Footer';
import Beta from 'components/Beta';
import Toast from 'components/Toast';
import { ReactComponent as InfiniteLogo } from '../../assets/svg/logos/infinite-logo-by-suku.svg';
import ErrorBoundary from 'components/ErrorBoundary';

export interface IProps {
  children: JSX.Element;
}

const AppLayout = ({ children }: IProps): JSX.Element => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Notification />
      <Header>
        <HeaderContent>
          <HeaderLeft>
            <Link to="/">
              <InfiniteLogo fill="white" />
            </Link>
          </HeaderLeft>
          <NavBar isSmall={isSmall} />
        </HeaderContent>
      </Header>

      <Toast isVisible={false} status={'success'} setIsVisible={() => false}>
        This is a simple error message. Can we help you to{' '}
        <a style={{ color: 'black' }}>fix the problem?</a>
      </Toast>
      <ErrorBoundary>{children}</ErrorBoundary>
      <Footer />
    </>
  );
};

const Header = styled.header`
  position: relative;
  background-color: black;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px;
`;

const HeaderContent = styled.div`
  // max-width: 1440px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  padding: 0 50px 0 50px;

  @media screen and (max-width: 960px) {
    padding: 0 32px 0 32px;
  }
`;

const Link = styled(LinkComponent)`
  && {
    color: white;
  }
`;

export default AppLayout;
