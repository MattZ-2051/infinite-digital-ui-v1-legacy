import NavBar from "components/NavBar";
import Footer from "components/Footer";
import styled from "styled-components/macro";
import ModalController from "components/ModalController";

export interface IProps {
  children: JSX.Element;
}

const AppLayout: React.FC<IProps> = ({ children }) => {
  return (
    <Container>
      <ModalController />
      <Header>
        <Logo>INFINITE</Logo>
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
  background-color: black;
  padding: 0 50px 0 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  color: white;
  font-size: 20px;
`;

export default AppLayout;
