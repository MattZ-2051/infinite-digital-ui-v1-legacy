import Link from '@material-ui/core/Link';
import styled from 'styled-components/macro';
import { useAppDispatch } from 'hooks/store';
import { openModal } from 'store/global/globalSlice';
import CartItems from '../CartItems';

// Icons
import MenuIcon from '@material-ui/icons/Menu';
import ZoomInIcon from '@material-ui/icons/ZoomIn';

const NavBarMenu = () => {
  const dispatch = useAppDispatch();

  const openModalByName = (name: string, data: object): void => {
    dispatch(
      openModal({
        name,
        data,
      })
    );
  };

  return (
    <Container>
      <Menu>
        <Item>Marketplace</Item>
        <Item>Drop Boxes</Item>
        <Item>Closets</Item>
        <Item>Account</Item>
        <Item>Notifications</Item>
        <Item>|</Item>
        <Item>
          <CartItems />
        </Item>
        <Item>
          <StyledLink href="#" onClick={() => openModalByName('LOGIN', {})}>
            LOG IN
          </StyledLink>
        </Item>
        <Item>
          <StyledLink href="#" onClick={() => openModalByName('SIGN_UP', {})}>
            SIGN UP
          </StyledLink>
        </Item>
        <Item>
          <ZoomInIcon />
        </Item>
        <Item>
          <MenuIcon />
        </Item>
      </Menu>
    </Container>
  );
};

const Container = styled.div`
  background-color: black;
  color: white;
`;

const Menu = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin: 10px;
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  && {
    color: white;
  }
`;

export default NavBarMenu;
