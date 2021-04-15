import React from 'react';
import styled from 'styled-components/macro';
import Tab from 'components/Tab';
import Tabs from 'components/TabsContainer';
import MarketPlace from './MarketPlace';
import DropBoxes from './DropBoxes';
import { useAuth0 } from '@auth0/auth0-react';

export interface IProps { }

const LatestProducts: React.FC<IProps> = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const { isAuthenticated } = useAuth0();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };
  return (
    <Container>
      {isAuthenticated && (
        <Tabs value={selectedTab} onChange={handleChange} centered width="90%">
          {/* Temporary comment to hide DropBoxes see issue #86
          <Tab label="Drop Boxes" disableFocusRipple disableRipple />
           */}
          <Tab label="Marketplace" disableFocusRipple disableRipple />
          <Tab label="My Collection" disableFocusRipple disableRipple />
        </Tabs>
      )}
      {!isAuthenticated && (
        <Tabs value={selectedTab} onChange={handleChange} centered width="50%">
          {/* Temporary comment to hide DropBoxes see issue #86
          <Tab label="Drop Boxes" disableFocusRipple disableRipple />
          */}
          <Tab label="Marketplace" disableFocusRipple disableRipple />
        </Tabs>
      )}


      {/* {selectedTab === 0 && <DropBoxes />} */}
      {selectedTab === 0 && <MarketPlace />}
      {selectedTab === 1 && <h1>My Collection</h1>}
    </Container>
  );
};

const Container = styled.section`
  padding: 40px;
  height: 100%;
  bottom: 40px;
  max-width: 1440px;
  margin: auto;
`;

export default LatestProducts;
