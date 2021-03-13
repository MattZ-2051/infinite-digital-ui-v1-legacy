import styled from 'styled-components/macro';
import Button from 'components/Button';

interface IProps {
  login: Function; // TODO: change type
  isAuthenticated: boolean;
}

const Menu = ({ login, isAuthenticated }: IProps) => {
  return (
    <Container>
      <ListMenu>
        <Item>
          <Button type='link' to="drop-boxes" color="white">
            Drop Boxes
          </Button>
        </Item>
        <Item>
          <Button type='link' to="marketplace" color="white">
            Marketplace
          </Button>
        </Item>

        {isAuthenticated && (
          <>
            <Item>
              <Button type='link' to="my-collection" color="white">
                My Collection
              </Button>
            </Item>
          </>
        )}

        {!isAuthenticated && (
          <>
            <Item>
              <Button type='link' onClick={() => login()} color="white" size="medium">
                Sign Up
              </Button>
            </Item>
            <Item>
              <Button type='link' onClick={() => login()} color="white" size="medium">
                Log In
              </Button>
            </Item>
          </>
        )}
      </ListMenu>
    </Container>
  );
};

const Container = styled.div`
  background-color: black;
  color: white;
`;

const ListMenu = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-left: 32px;
  display: flex;
  align-items: center;
`;

export default Menu;
