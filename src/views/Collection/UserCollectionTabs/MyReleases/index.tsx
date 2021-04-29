import React from 'react';
import ProductTile from '../../../MarketPlace/components/ProductTile';
import styled from 'styled-components/macro';
import { useAppSelector } from 'store/hooks';

const MyReleases = () => {
  return <MyReleasesContainer></MyReleasesContainer>;
};

const TileContainer = styled.div<{ index: number }>`
  padding: 0 10px;
  padding-left: ${({ index }) => `${index === 0 ? '0px' : '10px'}`};
`;

const MyReleasesContainer = styled.div`
  display: flex;
  overflow: auto;
  width: 100%;
`;

export default MyReleases;
