import { useState } from "react";
import styled from "styled-components/macro";
import ProfileButton from "components/Buttons/ProfileButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import EditIcon from "@material-ui/icons/Edit";

interface IProps {
  userStatus?: string;
}

const UserCollectioinInfo = ({ userStatus }: IProps) => {
  return (
    <Container>
      {userStatus === "loggedInIssuer" && (
        <>
          <AccountIcon />
          <UsernameIconContainer>
            <span style={{ paddingRight: "10px", fontSize: "24px" }}>
              @username
            </span>
            <EditIconContainer>
              <EditIcon style={{ fontSize: "14px" }} />
            </EditIconContainer>
          </UsernameIconContainer>
          <ButtonContainer>
            <ProfileButton label="My Account" />
            <div style={{ padding: "0 10px" }}>
              <ButtonDivider></ButtonDivider>
            </div>
            <ProfileButton label="My Wallet" />
          </ButtonContainer>
        </>
      )}
      {userStatus === "loggedIn" && (
        <>
          <UsernameIconContainer>
            <span style={{ paddingRight: "10px", fontSize: "24px" }}>
              @username
            </span>
            <EditIconContainer>
              <EditIcon style={{ fontSize: "14px" }} />
            </EditIconContainer>
          </UsernameIconContainer>
          <ButtonContainer>
            <ProfileButton label="My Account" />
            <div style={{ padding: "0 10px" }}>
              <ButtonDivider></ButtonDivider>
            </div>
            <ProfileButton label="My Wallet" />
          </ButtonContainer>
        </>
      )}
      {userStatus === "notCurrentUserProfile" && (
        <>
          <span style={{ paddingRight: "10px", fontSize: "24px" }}>
            @username
          </span>
        </>
      )}
      {userStatus === "notCurrentUserProfileIssuer" && (
        <>
          <AccountIcon />
          <span style={{ paddingRight: "10px", fontSize: "24px" }}>
            @username
          </span>
        </>
      )}
    </Container>
  );
};

const EditIconContainer = styled.div`
  width: 24px;
  height: 24px;
  background-color: black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: -webkit-linear-gradient(45deg, #ff9412 0%, #fff72d 98.96%);
  color: white;
  width: 100%;
  height: 30vh;
  flex-direction: column;
  position: relative;
`;

const ButtonContainer = styled.div`
  background-color: black;
  width: 232px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const AccountIcon = styled(AccountCircleIcon)`
  font-size: 120px;
`;

const ButtonDivider = styled.div`
  width: 2px;
  height: 16px;
  background-color: lightgray;
`;

const UsernameIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 16px;
`;

export default UserCollectioinInfo;
