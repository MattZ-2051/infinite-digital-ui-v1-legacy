import React from 'react'
import styled from 'styled-components';
import Tabs from 'components/TabsContainer';
import Tab from 'components/Tab';
import MyItems from './MyItems';
import FilterBox from 'components/FilterBox';
import MyReleases from './MyReleases';

interface IProps {
  userStatus?: 'loggedInIssuer' | 'loggedIn' | 'notCurrentUserProfile' | 'notCurrentUserProfileIssuer';
}

const ProfileTabs = ({ userStatus }: IProps) => {

  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <ItemsContainer >
      {userStatus === 'loggedIn' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Tabs value={selectedTab} onChange={handleChange} width="100%" style={{ paddingBottom: '20px' }}>
              <Tab label="My Items" disableFocusRipple disableRipple />
            </Tabs>
            <FilterBox type="sort" label="Latest" />
          </div>
          {selectedTab === 0 && <MyItems />}
        </>
      )}
      {userStatus === 'loggedInIssuer' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Tabs value={selectedTab} onChange={handleChange} width="100%" style={{ paddingBottom: '20px' }}>
              <Tab label="My Releases" disableFocusRipple disableRipple />
              <Tab label="My Items" disableFocusRipple disableRipple />
            </Tabs>
            <FilterBox type="sort" label="Most Popular" />
          </div>
          {selectedTab === 0 && <MyReleases />}
          {selectedTab === 1 && <MyItems />}
        </>
      )}
      {userStatus === 'notCurrentUserProfileIssuer' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Tabs value={selectedTab} onChange={handleChange} width="100%" style={{ paddingBottom: '20px' }}>
              <Tab label="Releases" disableFocusRipple disableRipple />
              <Tab label="Items" disableFocusRipple disableRipple />
            </Tabs>
            <FilterBox type="sort" label="Most Popular" />
          </div>
          {selectedTab === 0 && <MyReleases />}
          {selectedTab === 1 && <MyItems />}
        </>
      )}
      {userStatus === 'notCurrentUserProfile' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Tabs value={selectedTab} onChange={handleChange} width="100%" style={{ paddingBottom: '20px' }}>
              <Tab label="Items" disableFocusRipple disableRipple />
            </Tabs>
            <FilterBox type="sort" label="Most Popular" />
          </div>
          {selectedTab === 0 && <MyItems />}
        </>
      )}


    </ItemsContainer>

  )
}

const ItemsContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px;
`;

export default ProfileTabs
