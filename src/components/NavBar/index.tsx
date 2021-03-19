import { useState } from 'react';
import styled from 'styled-components/macro';
import Drawer from 'components/Drawer';
import Menu from './Menu';
import MobileMenu from './MobileMenu';
import UserAvatar from './UserAvatar';
import Hidden from '@material-ui/core/Hidden';
import { useAuth0 } from '@auth0/auth0-react';
import Button from 'components/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';

// Icons
import IconMenu from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'black',
    fontSize: 11,
  },
  arrow: {
    color: theme.palette.common.white,
  },
}))(Tooltip);

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

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
        />
      </Drawer>

      <Container>
        <Hidden smDown>
          <Menu login={loginWithRedirect} isAuthenticated={isAuthenticated} />
        </Hidden>

        {isAuthenticated && <UserAvatar style={{ marginRight: '15px' }} />}

        {isAuthenticated && (
          <Hidden smDown>
            <LightTooltip title="Log Out" arrow>
              <div>
                <Button
                  type="icon"
                  icon={ExitToAppIcon}
                  color="white"
                  onClick={() => logout()}
                />
              </div>
            </LightTooltip>
          </Hidden>
        )}

        <Hidden mdUp>
          {isOpen ? (
            <Button
              type="icon"
              icon={CloseIcon}
              color="white"
              onClick={toggleDrawer}
            />
          ) : (
            <Button
              type="icon"
              icon={IconMenu}
              color="white"
              onClick={toggleDrawer}
            />
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

// const LightTooltip = styled(Tooltip)`
//   background-color: blue;
//   z-index: 2000;
// `;

export default NavBar;
