import { useState } from 'react'
import styled from 'styled-components';
import MyItems from './MyItems';
import MyReleases from './MyReleases';

interface IProps {
  userStatus?: 'loggedInIssuer' | 'loggedIn' | 'notCurrentUserProfile' | 'notCurrentUserProfileIssuer';
}

const ProfileTabs = ({ userStatus }: IProps) => {

  const [selectedTab, setSelectedTab] = useState<number | undefined>(0)

  return (
    <Container >
      {userStatus === 'loggedIn' && (
        <>
          <div style={{ position: 'relative', paddingBottom: '30px' }}>
            <Tab
              style={{ borderBottom: `${selectedTab === 0 ? '2px solid black' : 'none'}`, color: `${selectedTab === 0 ? 'black' : '#9e9e9e'}` }}
              onClick={() => setSelectedTab(0)}>
              My Items
              </Tab>
            <span style={{ padding: '0 20px' }}></span>
            <GrayLine style={{ width: '100%' }}></GrayLine>
          </div>

          {selectedTab === 0 && <MyItems />}

        </>
      )}
      {userStatus === 'loggedInIssuer' && (
        <>
          <div style={{ position: 'relative', paddingBottom: '30px' }}>
            <Tab
              style={{ borderBottom: `${selectedTab === 0 ? '2px solid black' : 'none'}`, color: `${selectedTab === 0 ? 'black' : '#9e9e9e'}` }}
              onClick={() => setSelectedTab(0)}>
              My Releases
              </Tab>
            <span style={{ padding: '0 20px' }}></span>
            <Tab
              style={{ borderBottom: `${selectedTab === 1 ? '2px solid black' : 'none'}`, color: `${selectedTab === 1 ? 'black' : '#9e9e9e'}` }}
              onClick={() => setSelectedTab(1)}>
              My Items
              </Tab>
            <GrayLine style={{ width: '100%' }}></GrayLine>
          </div>
          {selectedTab === 0 && <MyReleases />}
          {selectedTab === 1 && <MyItems />}
        </>
      )}
      {userStatus === 'notCurrentUserProfileIssuer' && (
        <>
          <div style={{ position: 'relative', paddingBottom: '30px' }}>
            <Tab
              style={{ borderBottom: `${selectedTab === 0 ? '2px solid black' : 'none'}`, color: `${selectedTab === 0 ? 'black' : '#9e9e9e'}` }}
              onClick={() => setSelectedTab(0)}>
              Latest Transactions
              </Tab>
            <span style={{ padding: '0 20px' }}></span>
            <Tab
              style={{ borderBottom: `${selectedTab === 1 ? '2px solid black' : 'none'}`, color: `${selectedTab === 1 ? 'black' : '#9e9e9e'}` }}
              onClick={() => setSelectedTab(1)}>
              Active Bids
              </Tab>
            <GrayLine style={{ width: '100%' }}></GrayLine>
          </div>
          {selectedTab === 0 && <MyReleases />}
          {selectedTab === 1 && <MyItems />}
        </>
      )}
      {userStatus === 'notCurrentUserProfile' && (
        <>
          <div style={{ position: 'relative', paddingBottom: '30px' }}>
            <Tab
              style={{ borderBottom: `${selectedTab === 0 ? '2px solid black' : 'none'}`, color: `${selectedTab === 0 ? 'black' : '#9e9e9e'}` }}
              onClick={() => setSelectedTab(0)}>
              Items
              </Tab>
            <span style={{ padding: '0 20px' }}></span>
            <GrayLine style={{ width: '100%' }}></GrayLine>
          </div>
          {selectedTab === 0 && <MyItems />}
        </>
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px;
`;

const GrayLine = styled.div`
  border-bottom: 2px solid #d8d8d8;
  padding-top: 10px;
  width: 80%
`;

const Tab = styled.span`
  font-weight: 600;
  font-size: 22px;
  line-height: 27.83px;
  padding-bottom: 12px;
  border: none;
  position: relative;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none
  }
`;

export default ProfileTabs
