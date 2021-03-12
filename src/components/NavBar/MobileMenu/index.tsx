import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

interface IProps {
  login: Function;
  logout: Function;
  isAuthenticated: boolean;
}

const MobileMenu = ({ login, logout, isAuthenticated }: IProps) => {
  return (
    <>
      {isAuthenticated && <Title>Hello John!</Title>}

      {!isAuthenticated && (
        <AuthButtonsWrapper>
          <StyledButton onClick={() => login()}>Sign Up</StyledButton> |{' '}
          <StyledButton onClick={() => login()}>Sign In</StyledButton>
        </AuthButtonsWrapper>
      )}

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
              <StyledLink to="my-collection">My Collection</StyledLink>
            </Item>
          </>
        )}
      </ListMenu>

      {isAuthenticated && (
        <StyledButtonLogout onClick={() => logout()}>Log Out</StyledButtonLogout>
      )}
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

const StyledButton = styled(Button)`
  && {
    color: white;
    text-transform: none;
    font-size: 18px;
    margin: 0;
    padding: 0;
  }
`;

const StyledButtonLogout = styled(Button)`
  && {
    color: white;
    text-transform: none;
    margin: 0;
    padding: 0;
    justify-content: end;
  }
`;


const AuthButtonsWrapper = styled.div`
  margin-bottom: 40px;
`;

export default MobileMenu;
