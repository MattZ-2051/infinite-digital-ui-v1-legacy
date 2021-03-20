import styled from 'styled-components/macro';
import Divider from 'components/Divider';
import Button from 'components/Buttons/Button';

interface IProps {
  login: () => void;
  isAuthenticated: boolean;
}

const Menu = ({ login, isAuthenticated }: IProps) => {
  return (
    <Container>
      <Divider gap={32}>
        <Button to="drop-boxes" color="white">
          Drop Boxes
        </Button>

        <Button to="marketplace" color="white">
          Marketplace
        </Button>

        {isAuthenticated && (
          <Button to="my-collection" color="white">
            My Collection
          </Button>
        )}

        {!isAuthenticated && (
          <>
            <Button onClick={() => login()} color="white" size="medium">
              Sign Up
            </Button>

            <Button onClick={() => login()} color="white" size="medium">
              Log In
            </Button>
          </>
        )}
      </Divider>
    </Container>
  );
};

const Container = styled.div`
  background-color: black;
  color: white;
`;

export default Menu;
