import { useState } from 'react';
import styled from 'styled-components/macro';
import Hidden from '@material-ui/core/Hidden';
import { useAuth0 } from '@auth0/auth0-react';
// Local
import Drawer from 'components/Drawer';
import IconButton from 'components/Buttons/IconButton';
import Menu from './Menu';
import MobileMenu from './MobileMenu';
// Icons
import IconMenu from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

interface IProps {
  isSmall: boolean;
}

const NavBar = ({ isSmall }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <Drawer open={isOpen} anchor="right" onClose={() => setIsOpen(false)}>
        <MobileMenu
          login={loginWithRedirect}
          logout={logout}
          isAuthenticated={isAuthenticated}
          user={user}
        />
      </Drawer>

      <Container>
        <Hidden smDown>
          <Menu login={loginWithRedirect} isAuthenticated={isAuthenticated} />
        </Hidden>

        {isSmall && (
          <IconButton
            icon={isOpen ? CloseIcon : IconMenu}
            color="white"
            onClick={toggleDrawer}
            data-testid="navbar_toggle-drawer"
          />
        )}
      </Container>
    </>
  );
};

const Container = styled.nav`
  height: 80px;
  display: flex;
  align-items: center;
`;

export default NavBar;
