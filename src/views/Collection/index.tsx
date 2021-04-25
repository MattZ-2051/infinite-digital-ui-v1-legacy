import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import UserCollectionInfo from './UserCollectioinInfo';
import UserCollectionTabs from './UserCollectionTabs';
import { useAppSelector } from 'hooks/store';
import { useHistory } from 'react-router-dom';

const Collection = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const user = useAppSelector((store) => store.session.user);
  const history = useHistory();
  const userId = history.location.pathname.split('/')[2];

  let userStatus: any = '';

  const checkStatus = () => {
    if (userId === user.id && user.role === 'issuer') {
      userStatus = 'loggedInIssuer';
    } else if (userId === user.id) {
      userStatus = 'loggedIn';
    } else if (userId !== user.id) {
      userStatus = 'notCurrentUserProfile';
    } else {
      userStatus = 'notCurrentUserProfileIssuer';
    }
    return userStatus;
  };

  checkStatus();

  return (
    <Container>
      <UserCollectionInfo userStatus={userStatus} />
      <UserCollectionTabs userStatus={userStatus} />
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
`;

export default Collection;
