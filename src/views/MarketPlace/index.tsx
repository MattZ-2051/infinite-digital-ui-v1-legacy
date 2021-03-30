import React from 'react';
import styled from 'styled-components';
import SkuTile from 'components/ProductPanel/SkuTile';
import { useAppSelector } from 'hooks/store';
import FilterBox from 'components/FilterBox';
import FilterChip from 'components/FilterChip';

interface IProps { }

// test options for dropdown filter

const options = ['Series 001', 'Series 002', 'Series 003', 'Series 004', 'Series 005', 'Series 006']

const MarketPlace: React.FC<IProps> = () => {

  const { listings } = useAppSelector((state) => state.listings);

  return (
    <>
      <Container >
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
  align-items: center;
`;

export default MarketPlace;
