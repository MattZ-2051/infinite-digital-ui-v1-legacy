import { useState } from 'react';
import styled from 'styled-components/macro';
import Drawer from 'components/Drawer';
import Menu from './Menu';
import MobileMenu from './MobileMenu';
import UserAvatar from './UserAvatar';
import MuiAvatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import { useAuth0 } from '@auth0/auth0-react';
import MuiIconButton from '@material-ui/core/IconButton';

// Icons
import IconMenu from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
    isAuthenticated,
  } = useAuth0();

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  // const getToken = () => {
  //   getAccessTokenSilently()
  //     .then((token) => console.log(token))
  //     .catch((err) => console.log(err));
  // };

  return (
    <>
      <Drawer open={isOpen} anchor="right" onClose={() => setIsOpen(false)}>
        <MobileMenu login={loginWithRedirect} logout={logout} isAuthenticated={isAuthenticated} />
      </Drawer>

      <Container>
        <Hidden smDown>
          <Menu login={loginWithRedirect} isAuthenticated={isAuthenticated} />
        </Hidden>

        {isAuthenticated && <UserAvatar />}

        {isAuthenticated && (
          <Hidden smDown>
            <Avatar onClick={() => logout()}>
              <ExitToAppIcon />
            </Avatar>
          </Hidden>
        )}

        <Hidden mdUp>
          {isOpen ? (
            <IconButton aria-label="close" onClick={toggleDrawer}>
                <CloseIcon />
            </IconButton>
          ) : (
            <IconButton onClick={toggleDrawer}>
              <IconMenu />
            </IconButton>
          )}
        </Hidden>
      </Container>
    </>
  );
};

const Container = styled.nav`
  height: 80px;
  display: flex;
  align-items: center;
`;

const Avatar = styled(MuiAvatar)`
  margin-left: 15px;
  cursor: pointer;

  && {
    height: 32px;
    width: 32px;
    background-color: white;
    color: black;
  }
`;

const IconButton = styled(MuiIconButton)`
  && {
    height: 32px;
    width: 32px;
    background-color: white;
    color: black;
    margin-left: 15px;
  }
`;

export default NavBar;
