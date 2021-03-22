import { useState } from 'react';
import styled from 'styled-components/macro';
import Hidden from '@material-ui/core/Hidden';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import { useAuth0 } from '@auth0/auth0-react';
// Local
import Drawer from 'components/Drawer';
import IconButton from 'components/Buttons/IconButton';
import Menu from './Menu';
import MobileMenu from './MobileMenu';
import UserAvatar from './UserAvatar';
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

        {isAuthenticated && <UserAvatar style={{ marginRight: '15px' }}  data-testid="navbar_avatar"/>}

        {isAuthenticated && (
          <Hidden smDown>
            <LightTooltip title="Log Out" arrow>
              <div>
                <IconButton
                  icon={ExitToAppIcon}
                  color="white"
                  onClick={() => logout()}
                />
              </div>
            </LightTooltip>
          </Hidden>
        )}

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
