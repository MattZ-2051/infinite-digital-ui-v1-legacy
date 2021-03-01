import NavBarMenu from './NavBarMenu';
import styled from 'styled-components/macro';

const NavBar = () => {
  return (
    <Container>
      <NavBarMenu />
    </Container>
  );
};

const Container = styled.nav`
  height: 80px;
  display: flex;
  align-items: center;
`;

export default NavBar;
