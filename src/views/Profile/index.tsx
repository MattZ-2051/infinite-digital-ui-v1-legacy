import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import ProfileInfo from './ProfileInfo';
import ProfileTabs from './ProfileTabs';
import { useAppSelector } from 'hooks/store';

interface IProps { }

const user1 = {
  id: 'user1',
  userStatus: 'issuer'
}

const user2 = {
  id: 'user2',
  userStatus: 'logged-in'
}

const user3 = {
  id: 'user3',
  userStatus: 'not-logged-in'
}

const MyProfile: React.FC<IProps> = () => {

  const { isAuthenticated, loginWithRedirect } = useAuth0();
  // const user = useAppSelector(store => store.session.user);

  return (
    <Container>
      <ProfileInfo userStatus="notCurrentUserProfile" />
      <ProfileTabs userStatus="notCurrentUserProfile" />
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
`;

export default MyProfile;
