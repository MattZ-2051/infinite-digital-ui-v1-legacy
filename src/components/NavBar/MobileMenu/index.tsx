import styled from 'styled-components/macro';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from 'components/Button';

interface IProps {
  login: Function; // TODO: change type
  logout: Function; // TODO: change type
  isAuthenticated: boolean;
}

const MobileMenu = ({ login, logout, isAuthenticated }: IProps) => {
  return (
    <>
      {isAuthenticated && <Title>Hello John!</Title>}

      {!isAuthenticated && (
        <AuthButtonsWrapper>
          <Button type="link" color="white" size="big" onClick={() => login()}>
            Sign Up
          </Button>{' '}
          |{' '}
          <Button type="link" color="white" size="big" onClick={() => login()}>
            Sign In
          </Button>
        </AuthButtonsWrapper>
      )}

      <ListMenu>
        <Item>
          <Button type="link" color="white" to="drop-boxes">
            Drop Boxes
          </Button>
        </Item>
        <Item>
          <Button type="link" color="white" to="marketplace">
            Marketplace
          </Button>
        </Item>

        {isAuthenticated && (
          <>
            <Item>
              <Button type="link" color="white" to="my-collection">
                My Collection
              </Button>
            </Item>
          </>
        )}
      </ListMenu>

      {isAuthenticated && (
        <Button
          type="icon"
          icon={ExitToAppIcon}
          color="white"
          onClick={() => logout()}
          style={{position: 'absolute', bottom: '40px', right: '40px'}}
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
