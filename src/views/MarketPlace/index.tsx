import React, { useState } from 'react';
import Tabs from '../../components/TabsContainer';
import Tab from '../../components/Tab';
import styled from 'styled-components';
import AllMarketPlace from './AllMarketPlace';
import SearchBar from 'components/SearchBar';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from 'components/Buttons/IconButton';
import FilterBox from 'components/FilterBox';
import FilterChip from 'components/FilterChip';
import RangeSlider from 'components/RangeSlider';

export interface IProps { }


const options = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6']

const MarketPlace: React.FC<IProps> = () => {

  return (
    <>
      <Container >
        <ContainerHead>
          <h2>MarketPlace</h2>
          <SearchBar />
          <RangeSlider />
        </ContainerHead>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 46px 80px 0 80px;
  height: 100vh;
`;

const ContainerHead = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export default MarketPlace;
