import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserCollectionInfo from './UserCollectioinInfo';
import UserCollectionTabs from './UserCollectionTabs';
import { useHistory } from 'react-router-dom';
import { getUser } from 'services/api/userService';
import { useAuth0 } from '@auth0/auth0-react';

const Collection = () => {
  const [user, setUser] = useState(null);
  const history = useHistory();
  const userId = history.location.pathname.split('/')[2];
  const { isAuthenticated } = useAuth0();

  async function fetchUser() {
    const res = await getUser(userId).then((data) => {
      return data;
    });
    if (res.status === 200) {
      setUser(res.data);
      return res.data;
    }
  }

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return (
    <Container>
      <UserCollectionInfo user={user} isAuthenticated={isAuthenticated} />
      <UserCollectionTabs user={user} isAuthenticated={isAuthenticated} />
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
`;

export default Collection;
