import React from 'react';
import ProductTile from '../../../MarketPlace/components/ProductTile';
import styled from 'styled-components/macro';
import { useAppSelector } from 'store/hooks';

const MyReleases = () => {
  const mockItems = useAppSelector(
    (state) => state.session.userCollection.collectors
  );
  return (
    <MyReleasesContainer>
      {mockItems instanceof Array &&
        mockItems.map((item, index) => {
          let type = 'active-listing';
          const sku = item.sku;
          if (item.listing.status === 'active') {
            type = 'active-listing';
          } else {
            type = 'no-active-listing';
          }

          return (
            <TileContainer key={index} index={index}>
              <ProductTile
                sku={sku}
                redeemable={true}
                status={type}
                productSerialNumber={item.serialNumber}
                key={item.id}
                purchasedDate="1k"
              />
            </TileContainer>
          );
        })}
    </MyReleasesContainer>
  );
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
