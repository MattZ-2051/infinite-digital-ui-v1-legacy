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
`;

export default NavBar;
