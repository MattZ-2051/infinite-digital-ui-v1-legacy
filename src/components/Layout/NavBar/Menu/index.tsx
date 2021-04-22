import { useState } from "react";
import styled from "styled-components/macro";
import Divider from "components/Divider";
import TextButton from "components/Buttons/TextButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import UserProfileMenu from "../UserProfileMenu";

interface IProps {
  login: (options?: { screen_hint: string }) => void;
  isAuthenticated: boolean;
}

const Menu = ({ login, isAuthenticated }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean | undefined>(false);

  return (
    <Container>
      <Divider gap={32}>
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
            <AccountIcon onClick={() => setIsOpen(!isOpen)} />
            <TextButton color="white" style={{ marginRight: "32px" }}>
              @username
            </TextButton>
            {isOpen ? <UserProfileMenu /> : null}
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
