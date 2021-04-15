import React from 'react';
import Tabs from '../../components/TabsContainer';
import Tab from '../../components/Tab';
import styled from 'styled-components';
import AllMarketPlace from './AllMarketPlace';

export interface IProps { }

const MarketPlace: React.FC<IProps> = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };
  return (
    <>
      <Container >
        <ContainerHead>
          <h2>MarketPlace</h2>
          <Tabs value={selectedTab} onChange={handleChange} centered width="100%">
            <Tab label="All" disableFocusRipple disableRipple />
            <Tab label="Released" disableFocusRipple disableRipple />
            <Tab label="Upcoming" disableFocusRipple disableRipple />
            <Tab label="Sold Out" disableFocusRipple disableRipple />
          </Tabs>
        </ContainerHead>
        {selectedTab === 0 && (<AllMarketPlace />)}
        {selectedTab === 1 && (<h1>Released</h1>)}
        {selectedTab === 2 && (<h1>Upcoming</h1>)}
        {selectedTab === 3 && (<h1>Sold Out</h1>)}
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 46px 80px 0 80px;
`;

const ContainerHead = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export default MarketPlace;
