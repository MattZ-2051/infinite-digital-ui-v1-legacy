import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

interface IProps {
  login: Function;
  isAuthenticated: boolean;
}

const Menu = ({ login, isAuthenticated }: IProps) => {
  return (
    <Container>
      <ListMenu>
        <Item>
          <StyledLink to="drop-boxes">Drop Boxes</StyledLink>
        </Item>
        <Item>
          <StyledLink to="marketplace">Marketplace</StyledLink>
        </Item>

        {isAuthenticated && (
          <>
            <Item>
              <StyledLink to="/my-collection">My Collection</StyledLink>
            </Item>
          </>
        )}

        {!isAuthenticated && (
          <>
            <Item>
              <StyledButton onClick={() => login()}>Sign Up</StyledButton>
            </Item>
            <Item>
              <StyledButton onClick={() => login()}>Log In</StyledButton>
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

const StyledLink = styled(Link)`
  && {
    color: white;
  }
`;

const StyledButton = styled(Button)`
  && {
    color: white;
    text-transform: none;
    font-size: 1rem;
    margin: 0;
    padding: 0;
  }
`;

export default Menu;
