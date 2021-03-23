import React from 'react';
import styled from 'styled-components/macro';
import Tab from 'components/Tab';
import Tabs from 'components/TabsContainer';
import MarketPlace from './MarketPlace';
import DropBoxes from './DropBoxes';
import MyCollection from 'views/Landing/LatestProducts/MyCollection';

export interface IProps {
  isAuthenticated: boolean;
}

const LatestProducts: React.FC<IProps> = ({ isAuthenticated }: IProps) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };
  return (
    <Container>
      {isAuthenticated && (
        <Tabs value={selectedTab} onChange={handleChange} centered width="90%">
          <Tab label="Drop Boxes" disableFocusRipple disableRipple data-testid="dropBoxTab" />
          <Tab label="Marketplace" disableFocusRipple disableRipple data-testid="marketplaceTab" />
          <Tab label="My Collection" disableFocusRipple disableRipple data-testid="myCollectionTab" />
        </Tabs>
      )}
      {!isAuthenticated && (
        <Tabs value={selectedTab} onChange={handleChange} centered width="50%">
          <Tab label="Drop Boxes" disableFocusRipple disableRipple data-testid="dropBoxTab" />
          <Tab label="Marketplace" disableFocusRipple disableRipple data-testid="marketplaceTab" />
        </Tabs>
      )}


      {selectedTab === 0 && <DropBoxes />}
      {selectedTab === 1 && <MarketPlace />}
      {selectedTab === 2 && <MyCollection />}
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
`;

export default LatestProducts;
