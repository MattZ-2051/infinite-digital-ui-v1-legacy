import React from 'react';
import Tab from 'components/Tab';
import Tabs from 'components/TabsContainer';
import LatestReleases from './components/LatestReleases';
// import { MyCollection } from './components/MyCollection';
// import Items from 'views/Collection/UserCollectionTabs/Items';
import * as S from './styles';

const SkuTilesTab = (): JSX.Element => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event: React.ChangeEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  return (
    <S.Container>
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
        <S.ViewAll to="/marketplace">
          See more
        </S.ViewAll>
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
    </S.Container>
  );
};

export default SkuTilesTab;
