import { useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useAppSelector } from 'hooks/store';
import { Link } from 'react-router-dom';

export interface IProps {}

const MobileMenu = () => {
  const isAuth = useAppSelector((state) => state.session.user.isAuthenticated);
  let location = useLocation();

  return (
    <>
      <Title>Hello John!</Title>
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
    </>
  );
};

const Title = styled.h5`
  margin-bottom: 48px;
`;

const ListMenu = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
`;

const StyledLink = styled(Link)`
  && {
    color: white;
  }
`;

export default MobileMenu;
