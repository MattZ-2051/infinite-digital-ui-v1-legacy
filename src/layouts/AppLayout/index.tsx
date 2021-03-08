import NavBar from 'components/NavBar';
import Footer from 'components/Footer';
import styled from 'styled-components/macro';
import { Link as LinkComponent } from 'react-router-dom';
import Notification from 'components/Notification';

import { ReactComponent as InfiniteLogo } from '../../assets/svg/logos/infinite-logo.svg';

export interface IProps {
  children: JSX.Element;
}

const AppLayout: React.FC<IProps> = ({ children }) => {
  return (
    <Container>
      <Notification />
      <Header>
        <Link to="/">
          <InfiniteLogo fill="white" width="170px" />
        </Link>
        <NavBar />
      </Header>
      <Main>{children}</Main>
      <Footer />
    </Container>
  );
};

const Container = styled.div``;

const Main = styled.main`
  padding: 75px;
`;

const Header = styled.header`
  position: relative;
  z-index: 1320;
  background-color: black;
  padding: 0 50px 0 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;

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
