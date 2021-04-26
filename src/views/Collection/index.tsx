import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import UserCollectionInfo from './UserCollectioinInfo';
import UserCollectionTabs from './UserCollectionTabs';
import { useAppSelector } from 'store/hooks';
import { useHistory } from 'react-router-dom';
import { getUser } from 'services/api/userService';
import { User } from 'entities/user';

const Collection = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const user = useAppSelector((store) => store.session.user);
  const [otherUser, setOtherUser] = useState();
  const history = useHistory();
  const userId = history.location.pathname.split('/')[2];

  let userStatus: any = '';

  async function fetchUser() {
    const res = await getUser(userId).then((data) => {
      return data;
    });
    if (res.status === 200) {
      setOtherUser(res.data);
      return res.data;
    }
  }
  const checkStatus = () => {
    if (isAuthenticated === true) {
      if (userId === user.id && user.role === 'issuer') {
        userStatus = 'loggedInIssuer';
      } else if (userId === user.id) {
        userStatus = 'loggedIn';
      }
    } else if (userId !== user.id) {
      userStatus = 'notCurrentUserProfile';
    }
    return userStatus;
  };

  useEffect(() => {
    fetchUser();
  }, []);
  checkStatus();

  console.log(otherUser);

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
