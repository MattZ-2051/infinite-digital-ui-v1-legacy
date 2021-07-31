import { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Link as LinkComponent } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
// Local
import Notification from 'components/Notification';
import NavBar from 'components/Layout/NavBar';
import Footer from 'components/Layout/Footer';
import { ReactComponent as InfiniteLogo } from '../../assets/svg/logos/infinite-logo-by-suku.svg';
import ErrorBoundary from 'components/ErrorBoundary';
import PopUpModal from 'components/Modal/PopUpModal';
import CookieBanner from 'components/CookieBanner';

export interface IProps {
  children: JSX.Element;
}

const AppLayout = ({ children }: IProps): JSX.Element => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const [popUpVisible, setPopUpVisible] = useState<boolean>(false);
  const [cookieBannerVisible, setIsCookieBannerVisible] =
    useState<boolean>(false);

  useEffect(() => {
    const visited = localStorage['alreadyVisited'];
    if (visited) {
      setPopUpVisible(false);
      setIsCookieBannerVisible(false);
      //do not view Popup
    } else {
      //this is the first time
      localStorage['alreadyVisited'] = true;
      setPopUpVisible(true);
      setIsCookieBannerVisible(true);
    }
  }, []);

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
      <PopUpModal
        visible={popUpVisible}
        setPopUpVisible={setPopUpVisible}
        isCookieBannerOpen={cookieBannerVisible}
      />
      <ErrorBoundary>
        <MainContainer>{children}</MainContainer>
      </ErrorBoundary>
      <CookieBanner
        isVisible={cookieBannerVisible}
        setIsVisible={setIsCookieBannerVisible}
      />
      <Footer />
    </>
  );
};

const Header = styled.header`
  position: relative;
  background-color: black;
`;

const MainContainer = styled.div`
  min-height: calc(100vh - 128px);
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px;
`;

const HeaderContent = styled.div`
  max-width: 1440px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  padding: 0 80px 0 80px;
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
