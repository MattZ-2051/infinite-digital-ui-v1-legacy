import styled from 'styled-components/macro';
import Divider from 'components/Divider';
import TextButton from 'components/Buttons/TextButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

interface IProps {
  login: () => void;
  isAuthenticated: boolean;
}

const Menu = ({ login, isAuthenticated }: IProps) => {
  return (
    <Container>
      <Divider gap={32}>
        <TextButton to="drop-boxes" color="white">
          Drop Boxes
        </TextButton>

        <TextButton to="marketplace" color="white">
          Marketplace
        </TextButton>

        {isAuthenticated && (
          <TextButton to="my-collection" color="white">
            My Collection
          </TextButton>
        )}

        {isAuthenticated && (
          <AcountInfoContainer>
            <AccountCircleIcon style={{ color: 'white' }} />
            <TextButton to="my-collection" color="white" style={{ marginRight: '32px' }}>
              @username
            </TextButton>
          </AcountInfoContainer>
        )}

        {!isAuthenticated && (
          <>
            <TextButton onClick={() => login()} color="white" size="medium">
              Sign Up
            </TextButton>

            <TextButton onClick={() => login()} color="white" size="medium">
              Log In
            </TextButton>
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

const AcountInfoContainer = styled.div`
  display: flex;
  align-items; center;
`;

export default Menu;
