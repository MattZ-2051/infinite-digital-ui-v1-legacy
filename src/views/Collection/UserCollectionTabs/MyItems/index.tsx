import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useAppSelector } from 'hooks/store';
import ProductTile from '../../../MarketPlace/components/ProductTile';
import { getUserCollection } from 'services/api/userService';

const MyItems = () => {
  const mockItems = useAppSelector(
    (state) => state.session.userCollection.collectors
  );
  const history = useHistory();
  const id = history.location.pathname.split('/')[2];
  const [userItems, setUserItems] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      //TODO change enpoint this is a mock server endpoint
      const res = await getUserCollection('', id);
      if (res) {
        setUserItems(res.data.collectors);
      }
    }

    fetchData();
  }, [id]);

  return (
    <MyItemsContainer>
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
                redeemable={true}
                status={type}
                name={sku.name}
                img={sku.graphicUrl}
                rarity={sku.rarity}
                series={sku.series.name}
                productSerialNumber={item.serialNumber}
                issuer={'adidas'}
                key={item.id}
                purchasedDate="1k"
              />
            </TileContainer>
          );
        })}
    </MyItemsContainer>
  );
};

const TileContainer = styled.div<{ index: number }>`
  padding: 0 20px;
  padding-left: ${({ index }) => `${index === 0 ? '0px' : '10px'}`};
`;

const MyItemsContainer = styled.div`
  display: flex;
  overflow: auto;
  width: 100%;
`;

export default MyItems;
