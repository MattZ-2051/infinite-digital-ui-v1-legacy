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
import { ReactComponent as SukuLogo } from 'assets/svg/logos/suku.svg';
import { ReactComponent as AriaLogo } from 'assets/svg/logos/aria-white.svg';

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
              <AriaLogo />
            </Link>
            <div className="powered">
              <span>Powered by</span>
              <span>
                <SukuLogo />
              </span>
            </div>
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
  z-index: 1320;
  background-color: black;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  .powered {
    margin-top: 5px;
    color: #fff;
    padding-left: 15px;
    font-family: Plus Jakarta Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    span:first-child {
      margin-right: 4px;
    }
  }
`;

const HeaderContent = styled.div`
  max-width: 1440px;
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
