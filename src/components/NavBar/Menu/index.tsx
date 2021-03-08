import { useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useAppSelector } from 'hooks/store';
import { Link } from 'react-router-dom';

const Menu = () => {
  const isAuth = useAppSelector((state) => state.session.user.isAuthenticated);
  let location = useLocation();

  return (
    <Container>
      <ListMenu>
        <Item>
          <StyledLink to="drop-boxes">Drop Boxes</StyledLink>
        </Item>
        <Item>
          <StyledLink to="marketplace">Marketplace</StyledLink>
        </Item>

        {isAuth && (
          <>
            <Item>
              <StyledLink to="/my-collection">My Collection</StyledLink>
            </Item>
            <Item>
              <StyledLink to="sign-out">Logout</StyledLink>
            </Item>
          </>
        )}

        {!isAuth && (
          <>
            <Item>
              <StyledLink
                to={{
                  pathname: '/sign-up',
                  state: { background: location },
                }}
              >
                Sign Up
              </StyledLink>
            </Item>
            <Item>
              <StyledLink
                to={{
                  pathname: '/login',
                  state: { background: location },
                }}
              >
                Log In
              </StyledLink>
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

export default Menu;
