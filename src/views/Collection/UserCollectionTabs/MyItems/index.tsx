import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import ProductTile from '../../../MarketPlace/components/ProductTile';
import { getUserCollection } from 'services/api/userService';
import { useAuth0 } from '@auth0/auth0-react';

const MyItems = () => {
  const history = useHistory();
  const id = history.location.pathname.split('/')[2];
  const [userItems, setUserItems] = useState<any>(null);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    async function fetchData() {
      //TODO change enpoint this is a mock server endpoint
      const userToken = await getAccessTokenSilently();
      const res = await getUserCollection(id, userToken);
      if (res) {
        setUserItems(res.data);
      }
    }

    fetchData();
  }, []);

  return (
    <MyItemsContainer>
      {userItems === undefined || null ? (
        <h1>Loading Items...</h1>
      ) : userItems?.length === 0 ? (
        <h1>No Items Yet!</h1>
      ) : (
        userItems instanceof Array &&
        userItems.map((item, index) => {
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
        })
      )}
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
