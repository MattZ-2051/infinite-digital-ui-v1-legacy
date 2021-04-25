import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import ProductTile from '../../../MarketPlace/components/ProductTile';
import { getProductsOwnedByUser } from 'services/api/productService';
import { useAuth0 } from '@auth0/auth0-react';
import { getMe } from 'services/api/userService';
import { Product } from 'entities/product';

const MyItems = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const history = useHistory();
  const id = history.location.pathname.split('/')[2];
  const [userItems, setUserItems] = useState<Product[]>([]);

  async function fetchUser() {
    const token = await getAccessTokenSilently();
    const extUser = await getMe(token);
    const res = await getProductsOwnedByUser(extUser.data._id, token);
    if (res) {
      setUserItems(res);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [id]);

  return (
    <MyItemsContainer>
      {userItems &&
        userItems.map((item: Product, index) => {
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
                // TODO: get issuer name
                // backend response returns issuer ID in product.listing
                issuer={'adidas'}
                key={item._id}
                // TODO: Find out why this is not a Date
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
