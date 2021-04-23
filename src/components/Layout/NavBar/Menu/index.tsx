<<<<<<< HEAD
import { useState } from "react";
import styled from "styled-components/macro";
import Divider from "components/Divider";
import TextButton from "components/Buttons/TextButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import UserProfileMenu from "../UserProfileMenu";
=======
import styled from 'styled-components/macro';
import Divider from 'components/Divider';
import TextButton from 'components/Buttons/TextButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import UserProfileMenu from '../UserProfileMenu';
import { useOutsideAlert } from 'hooks/oustideAlerter';
import { useAppSelector } from 'hooks/store';
>>>>>>> development

interface IProps {
  login: (options?: { screen_hint: string }) => void;
  isAuthenticated: boolean;
}

const Menu = ({ login, isAuthenticated }: IProps) => {
  const { visible, setVisible, ref } = useOutsideAlert(false);
  const username = useAppSelector((state) => state.session.user.username);

  return (
    <Container>
      <Divider gap={32}>
<<<<<<< HEAD
        <TextButton to="marketplace" color="white">
=======
        <TextButton to="/marketplace" color="white">
>>>>>>> development
          Marketplace
        </TextButton>

        {isAuthenticated && (
          <TextButton to={`/collection/${username}`} color="white">
            My Collection
          </TextButton>
        )}

        {isAuthenticated && (
          <AcountInfoContainer>
<<<<<<< HEAD
            <AccountIcon onClick={() => setIsOpen(!isOpen)} />
            <TextButton color="white" style={{ marginRight: "32px" }}>
=======
            <div ref={ref}>
              <AccountIcon onClick={() => setVisible(!visible)} />
              {visible ? <UserProfileMenu setVisible={setVisible} /> : null}
            </div>

            <TextButton color="white" style={{ marginRight: '32px' }}>
>>>>>>> development
              @username
            </TextButton>
          </AcountInfoContainer>
        )}

        {!isAuthenticated && (
          <>
            <TextButton
              onClick={() => login({ screen_hint: 'signup' })}
              color="white"
              size="medium"
            >
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
  align-items: center;
  position: relative;
`;

const AccountIcon = styled(AccountCircleIcon)`
  color: white;
  margin-right: 5px;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export default Menu;
