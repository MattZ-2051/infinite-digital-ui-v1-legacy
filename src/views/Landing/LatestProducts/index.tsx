import React from 'react';
import styled from 'styled-components/macro';
import Tab from '../../../components/Tab';
import Tabs from '../../../components/TabsContainer';
import MarketPlace from './MarketPlace';
import DropBoxes from './DropBoxes';
import { useAppSelector } from 'hooks/store';

export interface IProps {
  //dropBoxArr: any;
  //listingsArr: any;
}

const LatestProducts: React.FC<IProps> = ({ dropBoxArr = [], listingsArr = [] }: any) => {
  const { listings } = useAppSelector((state) => state.listings);
  const { dropBoxes } = useAppSelector((state) => state.dropBoxes);

  const [selectedTab, setSelectedTab] = React.useState(0);

  if ((dropBoxArr || listingsArr) === [] || !dropBoxArr || !listingsArr)
    return null;
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };
  return (
    <Container>
      <Tabs value={selectedTab} onChange={handleChange} centered width="90%">
        <Tab label="Drop Boxes" disableFocusRipple disableRipple />
        <Tab label="Marketplace" disableFocusRipple disableRipple />
        <Tab label="My Collection" disableFocusRipple disableRipple />
      </Tabs>

      {selectedTab === 0 && <DropBoxes dropBoxArr={dropBoxArr} />}
      {selectedTab === 1 && <MarketPlace panelPropsArr={listingsArr} />}
      {selectedTab === 2 && <h1>My Collection</h1>}
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
