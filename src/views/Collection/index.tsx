import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserCollectionInfo from './UserCollectioinInfo';
import UserCollectionTabs from './UserCollectionTabs';
import { useHistory } from 'react-router-dom';
import { getUser } from 'services/api/userService';
import { useAuth0 } from '@auth0/auth0-react';
import { PulseLoader } from 'react-spinners';

const Collection = () => {
  const [user, setUser] = useState<any>(null);
  const history = useHistory();
  const userId = history.location.pathname.split('/')[2];
  const { isAuthenticated } = useAuth0();

  async function fetchUser() {
    try {
      const res = await getUser(userId);
      setUser(res);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [userId]);

  if (user === null) {
    return (
      <Container>
        <PulseLoader
          size={50}
          color={'#000'}
          margin={10}
          css={
            'display:flex;justify-content:center;align-items:center;height:80%;'
          }
        />
      </Container>
    );
  }

  return (
    <Container>
      <UserCollectionInfo user={user} isAuthenticated={isAuthenticated} />
      <UserCollectionTabs user={user} isAuthenticated={isAuthenticated} />
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
`;

export default Collection;
