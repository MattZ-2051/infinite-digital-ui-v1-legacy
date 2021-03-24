import React from 'react';
import Tabs from '../../components/TabsContainer';
import Tab from '../../components/Tab';
import styled from 'styled-components';
import AllMarketPlace from './AllMarketPlace';
import SearchBar from 'components/SearchBar';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from 'components/Buttons/IconButton';
import FilterBox from 'components/FilterBox';

export interface IProps { }


const options = ['test1', 'test2', 'test3']
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
            <IconButton icon={FilterListIcon} color="black" size="big" style={{ verticalAlign: 'middle' }} />

          </Tabs>
        </ContainerHead>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <SearchBar />
          <FilterBox type="dropDown" options={options} label="Sort By" width="120px" data-testid='sortByFilter' />
        </div>
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
