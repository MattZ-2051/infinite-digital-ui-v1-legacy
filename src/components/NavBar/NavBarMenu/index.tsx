import styled from "styled-components/macro";
import { useAppDispatch } from "hooks/store";
import { openModal } from "store/global/globalSlice";

export interface NavBarMenuProps {}

const NavBarMenu: React.FC<NavBarMenuProps> = () => {
  const dispatch = useAppDispatch();

  const openModalByName = (name: any, data: any): any => {
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
        <MenuItem>Marketplace</MenuItem>
        <MenuItem>Drop Boxes</MenuItem>
        <MenuItem>Closets</MenuItem>
        <MenuItem>Account</MenuItem>
        <MenuItem>Notifications</MenuItem>
        <MenuItem>|</MenuItem>
        <MenuItem>0 Items</MenuItem>
        <MenuItem>
          LOG IN <button onClick={() => openModalByName("LOGIN", {})}>login</button>
        </MenuItem>
        <MenuItem>
          SIGN UP{" "}
          <button onClick={() => openModalByName("SIGN_UP", {})}>sign Up</button>
        </MenuItem>
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
