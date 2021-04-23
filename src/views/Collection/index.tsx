import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import UserCollectionInfo from './UserCollectioinInfo';
import UserCollectionTabs from './UserCollectionTabs';
import { useAppSelector } from 'hooks/store';
import { useHistory } from 'react-router-dom';

interface IProps {}

const Collection: React.FC<IProps> = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const user = useAppSelector((store) => store.session.user);
  const history = useHistory();
  const username = history.location.pathname.split('/')[2];

  let userStatus: any = '';

  const checkStatus = () => {
    if (username === user.username && user.role === 'issuer') {
      userStatus = 'loggedInIssuer';
    } else if (username === user.username) {
      userStatus = 'loggedIn';
    } else if (username !== user.username) {
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
  height: 70%;
`;

export default Collection;
