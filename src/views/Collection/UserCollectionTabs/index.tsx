import React, { useState } from 'react';
import styled from 'styled-components';
import MyItems from './MyItems';
import MyReleases from './MyReleases';
import SortByFilter from './SortByFilter';
import { User } from 'entities/user';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';

interface IProps {
  user?: User | null;
  isAuthenticated: boolean;
}

const UserCollectionTabs = ({ user, isAuthenticated }: IProps) => {
  const [selectedTab, setSelectedTab] = useState<number | undefined>(0);
  const history = useHistory();
  const loggedInUser = useAppSelector((state) => state.session.user);

  const userId = history.location.pathname.split('/')[2];

  let userStatus = '';

  if (isAuthenticated === true) {
    if (userId === loggedInUser.id && loggedInUser.role === 'issuer') {
      userStatus = 'loggedInIssuer';
    } else if (userId === loggedInUser.id) {
      userStatus = 'loggedIn';
    } else if (userId !== loggedInUser.id && user?.role === 'issuer') {
      userStatus = 'notCurrentUserProfileIssuer';
    } else if (userId !== loggedInUser.id) {
      userStatus = 'notCurrentUserProfile';
    }
  } else {
    if (user?.role === 'issuer') {
      userStatus = 'notCurrentUserProfileIssuer';
    } else {
      userStatus = 'notCurrentUserProfile';
    }
  }

  // TODO: REVIEW
  const placeHolderFunc = () => null;
  return (
    <Container>
      {userStatus === 'loggedIn' && (
        <>
          <div style={{ position: 'relative', paddingBottom: '30px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <Tab
                  style={{
                    borderBottom: `${
                      selectedTab === 0 ? '2px solid black' : 'none'
                    }`,
                    color: `${selectedTab === 0 ? 'black' : '#9e9e9e'}`,
                  }}
                  onClick={() => setSelectedTab(0)}
                >
                  My Items
                </Tab>
              </div>
              <span style={{ padding: '0 20px' }}></span>
              <SortByFilter
                options={['Latest', 'test']}
                handleFilter={placeHolderFunc}
                activeFilterSort={''}
              />
            </div>
            <GrayLine style={{ width: '100%' }}></GrayLine>
          </div>

          {selectedTab === 0 && <MyItems />}
        </>
      )}
      {userStatus === 'loggedInIssuer' && (
        <>
          <div style={{ position: 'relative', paddingBottom: '30px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <Tab
                  style={{
                    borderBottom: `${
                      selectedTab === 0 ? '2px solid black' : 'none'
                    }`,
                    color: `${selectedTab === 0 ? 'black' : '#9e9e9e'}`,
                  }}
                  onClick={() => setSelectedTab(0)}
                >
                  My Releases
                </Tab>
                <span style={{ padding: '0 20px' }}></span>
                <Tab
                  style={{
                    borderBottom: `${
                      selectedTab === 1 ? '2px solid black' : 'none'
                    }`,
                    color: `${selectedTab === 1 ? 'black' : '#9e9e9e'}`,
                  }}
                  onClick={() => setSelectedTab(1)}
                >
                  My Items
                </Tab>
              </div>
              <SortByFilter
                options={['Latest', 'option']}
                handleFilter={placeHolderFunc}
                activeFilterSort={''}
              />
            </div>
            <GrayLine style={{ width: '100%' }}></GrayLine>
          </div>
          {selectedTab === 0 && <MyReleases />}
          {selectedTab === 1 && <MyItems />}
        </>
      )}
      {userStatus === 'notCurrentUserProfileIssuer' && (
        <>
          <div style={{ position: 'relative', paddingBottom: '30px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <Tab
                  style={{
                    borderBottom: `${
                      selectedTab === 0 ? '2px solid black' : 'none'
                    }`,
                    color: `${selectedTab === 0 ? 'black' : '#9e9e9e'}`,
                  }}
                  onClick={() => setSelectedTab(0)}
                >
                  Releases
                </Tab>
                <span style={{ padding: '0 20px' }}></span>
                <Tab
                  style={{
                    borderBottom: `${
                      selectedTab === 1 ? '2px solid black' : 'none'
                    }`,
                    color: `${selectedTab === 1 ? 'black' : '#9e9e9e'}`,
                  }}
                  onClick={() => setSelectedTab(1)}
                >
                  Items
                </Tab>
              </div>
              <SortByFilter
                options={['Latest']}
                handleFilter={placeHolderFunc}
                activeFilterSort={''}
              />
            </div>

            <GrayLine style={{ width: '100%' }}></GrayLine>
          </div>
          {selectedTab === 0 && <MyReleases />}
          {selectedTab === 1 && <MyItems />}
        </>
      )}
      {userStatus === 'notCurrentUserProfile' && (
        <>
          <div style={{ position: 'relative', paddingBottom: '30px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <Tab
                  style={{
                    borderBottom: `${
                      selectedTab === 0 ? '2px solid black' : 'none'
                    }`,
                    color: `${selectedTab === 0 ? 'black' : '#9e9e9e'}`,
                  }}
                  onClick={() => setSelectedTab(0)}
                >
                  Items
                </Tab>
              </div>
              <span style={{ padding: '0 20px' }}></span>
              <SortByFilter
                options={['Latest']}
                handleFilter={placeHolderFunc}
                activeFilterSort={''}
              />
            </div>

            <GrayLine style={{ width: '100%' }}></GrayLine>
          </div>
          {selectedTab === 0 && <MyItems />}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 40px;
`;

const GrayLine = styled.div`
  border-bottom: 2px solid #d8d8d8;
  width: 80%;
`;

const Tab = styled.span`
  font-weight: 600;
  font-size: 22px;
  line-height: 27.83px;
  padding-bottom: 14px;
  border: none;
  position: relative;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
`;

export default UserCollectionTabs;
