import styled from "styled-components/macro";
import { useAppSelector, useAppDispatch } from "hooks/store";
import { openModal } from "store/global/globalSlice";

export interface NavBarMenuProps {}

const NavBarMenu: React.FC<NavBarMenuProps> = () => {
  const dispatch = useAppDispatch();

  const openLoginModal = () => {
    dispatch(
      openModal({
        LOGIN: {
          user: 1,
          accessLevel: 1,
        },
      })
    );
  };

  return (
    <Container>
      <Menu>
        <MenuItem>Marketplace</MenuItem>
        <MenuItem>Drop Boxes</MenuItem>
        <MenuItem>Closets</MenuItem>
        <MenuItem>Account</MenuItem>
        <MenuItem>Notifications</MenuItem>
        <MenuItem>|</MenuItem>
        <MenuItem>0 Items</MenuItem>
        <MenuItem>
          LOG IN <button onClick={openLoginModal}>login</button>
        </MenuItem>
        <MenuItem>SIGN UP</MenuItem>
        <MenuItem>Zoom</MenuItem>
        <MenuItem>M</MenuItem>
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

const MenuItem = styled.li`
  margin: 10px;
`;

export default NavBarMenu;
