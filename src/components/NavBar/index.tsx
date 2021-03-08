import { useState } from 'react';
import styled from 'styled-components/macro';
import Drawer from 'components/Drawer';
import Menu from './Menu';
import MobileMenu from './MobileMenu';
import UserAvatar from './UserAvatar';
import AvatarMUI from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import { useAppSelector } from 'hooks/store';

// Icons
import IconMenu from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

const NavBar = () => {
  const isAuth = useAppSelector((state) => state.session.user.isAuthenticated);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <Drawer open={isOpen} anchor="right" onClose={() => setIsOpen(false)}>
        <MobileMenu />
      </Drawer>

      <Container>
        <Hidden smDown>
          <Menu />
        </Hidden>

        {isAuth && <UserAvatar />}

        <Hidden mdUp>
          {isOpen ? (
            <Avatar onClick={toggleDrawer}>
              <CloseIcon />
            </Avatar>
          ) : (
            <Avatar onClick={toggleDrawer}>
              <IconMenu />
            </Avatar>
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

const Avatar = styled(AvatarMUI)`
  margin-left: 15px;
  cursor: pointer;

  && {
    height: 32px;
    width: 32px;
    background-color: white;
    color: black;
  }
`;

export default NavBar;
