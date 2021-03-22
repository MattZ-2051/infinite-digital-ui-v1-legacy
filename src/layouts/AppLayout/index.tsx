import styled from 'styled-components/macro';
import { Link as LinkComponent } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
// Local
import Notification from 'components/Notification';
import NavBar from 'components/NavBar';
import Footer from 'components/Footer';

import { ReactComponent as InfiniteLogo } from '../../assets/svg/logos/infinite-logo.svg';

export interface IProps {
  children: JSX.Element;
}

const AppLayout: React.FC<IProps> = ({ children }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Notification />
      <Header>
        <HeaderContent>
          <Link to="/">
            <InfiniteLogo fill="white" width="170px" />
          </Link>
          <NavBar isSmall={isSmall} />
        </HeaderContent>
      </Header>
      {children}
      <Footer />
    </>
  );
};

const Header = styled.header`
  position: relative;
  z-index: 1320;
  background-color: black;
  border-bottom: 1px solid white;
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
