import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import Tab from 'components/Tab';
import Tabs from 'components/TabsContainer';
import LatestReleases from './components/LatestReleases';
// import { MyCollection } from './components/MyCollection';
// import Items from 'views/Collection/UserCollectionTabs/Items';

export interface IProps {
  isAuthenticated: boolean;
}

const SkuTilesTab = ({ isAuthenticated }: IProps): JSX.Element => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event: React.ChangeEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  return (
    <Container>
      <Tabs value={selectedTab} onChange={handleChange} centered>
        {/* {isAuthenticated && (
          <Tab
            label="My Collection"
            disableFocusRipple
            disableRipple
            data-testid="marketplaceTab"
          />
        )} */}
        <Tab
          label="Latest Releases"
          disableFocusRipple
          disableRipple
          data-testid="myCollectionTab"
        />
        <ViewAll to="/marketplace?page=1&per_page=6&sortBy=startDate:asc">
          + View all
        </ViewAll>
      </Tabs>

      {selectedTab === 0 && <LatestReleases />}
      {/**
       * TODO: Replace MyCollection component
       * There is a very similar component (MyItems) in
       * /views/Collection/UserCollectionTabs/MyItems/index.tsx
       * MyItems is almost doing the same thing but the CSS does not look good with this view
       * Those two components should be merged.
       */}
      {/* {selectedTab === 1 && <MyCollection />} */}
    </Container>
  );
};

const Container = styled.section`
  padding: 40px;
  height: 100%;
  bottom: 40px;
  max-width: 1440px;
  margin: auto;
  border-radius: 10px;

  @media screen and (max-width: 960px) {
    padding: 24px;
  }
`;

const ViewAll = styled(Link)`
  position: absolute;
  right: 0;
  top: 21px;
  text-decoration: none;
  font-size: 18px;
`;

export default SkuTilesTab;
