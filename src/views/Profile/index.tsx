import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileInfo from "./ProfileInfo";
import ProfileTabs from "./ProfileTabs";
import { useAppSelector } from "hooks/store";
import { useHistory } from "react-router-dom";

interface IProps {}

const MyProfile: React.FC<IProps> = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  // const user = useAppSelector(store => store.session.user);
  const history = useHistory();

  const dummyUserId = history.location.pathname.split("/")[2];

  let userStatus: any = "loggedIn";

  const checkStatus = () => {
    if (dummyUserId === "1") {
      userStatus = "notCurrentUserProfileIssuer";
    } else if (dummyUserId === "2") {
      userStatus = "loggedInIssuer";
    } else if (dummyUserId === "3") {
      userStatus = "loggedIn";
    } else if (dummyUserId === "4") {
      userStatus = "notCurrentUserProfile";
    } else {
      userStatus = "loggedIn";
    }

    return userStatus;
  };

  checkStatus();

  return (
    <Container>
      <ProfileInfo userStatus={userStatus} />
      <ProfileTabs userStatus={userStatus} />
    </Container>
  );
};

const Container = styled.div`
  height: 70%;
`;

export default MyProfile;
