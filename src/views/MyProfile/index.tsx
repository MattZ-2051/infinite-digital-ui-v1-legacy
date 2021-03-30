import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import ProfileInfo from './ProfileInfo';
import ProfileItems from './ProfileItems';

interface IProps { }

const MyProfile: React.FC<IProps> = () => {

  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <Container>
      <ProfileInfo />
      <ProfileItems />
    </Container>
  )
}

const Container = styled.div`
  height: 80vh;
`;

export default MyProfile;
