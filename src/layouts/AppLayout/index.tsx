import NavBar from 'components/NavBar';
import Footer from "components/Footer";
import styled from "styled-components/macro";

export interface IProps {
  children: JSX.Element;
}

const AppLayout: React.FC<IProps> = ({ children }) => {
  return (
    <Container>
      <Header>
          INFINITE
        <NavBar />
      </Header>
      <Main>{children}</Main>
      <Footer />
    </Container>
  );
};

const Container = styled.div``;

const Main = styled.main``;

const Header = styled.header``;

export default AppLayout;
