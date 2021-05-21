import { useAppSelector } from 'store/hooks';
import styled from 'styled-components/macro';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TextButton from 'components/Buttons/TextButton';
import IconButton from 'components/Buttons/IconButton';

interface IProps {
  login: (options?: { screen_hint: string }) => void;
  logout: (redirect?: any) => void;
  isAuthenticated: boolean;
  user?: { name: string };
  onSelect?: () => void;
}

const MobileMenu = ({
  login,
  logout,
  isAuthenticated,
  user,
  onSelect,
}: IProps): JSX.Element => {
  const userData = useAppSelector((state) => state.session.user);
  return (
    <>
      {isAuthenticated && (
        <Title data-testid="user-name">Hello {user?.name || ''}!</Title>
      )}

      {!isAuthenticated && (
        <AuthButtonsWrapper>
          <TextButton
            color="white"
            size="big"
            onClick={() => login({ screen_hint: 'signup' })}
          >
            Sign Up
          </TextButton>{' '}
          |{' '}
          <TextButton color="white" size="big" onClick={() => login()}>
            Sign In
          </TextButton>
        </AuthButtonsWrapper>
      )}

      <ListMenu>
        <Item>
          <TextButton
            type="link"
            color="white"
            to="/marketplace?page=1&per_page=6&sortBy=startDate:asc"
            onClick={onSelect}
          >
            Marketplace
          </TextButton>
        </Item>

        {isAuthenticated && (
          <Item>
            <TextButton
              type="link"
              to={`/collection/${userData.id}`}
              color="white"
              onClick={onSelect}
            >
              My Collection
            </TextButton>
          </Item>
        )}
      </ListMenu>

      {isAuthenticated && (
        <IconButton
          icon={ExitToAppIcon}
          color="white"
          onClick={() => logout({ returnTo: window.location.origin })}
          style={{ position: 'absolute', bottom: '40px', right: '40px' }}
          data-testid="logout-btn"
        />
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

const AuthButtonsWrapper = styled.div`
  margin-bottom: 40px;
`;

export default MobileMenu;
