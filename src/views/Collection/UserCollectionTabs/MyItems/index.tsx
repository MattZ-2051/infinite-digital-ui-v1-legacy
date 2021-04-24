import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import ProductTile from '../../../MarketPlace/components/ProductTile';
import { getProductsOwnedByUser } from 'services/api/productService';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserInfoByAuth0Id } from 'services/api/userService';
import { Product } from 'entities/product';

const MyItems = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const history = useHistory();
  const id = history.location.pathname.split('/')[2];
  const [userItems, setUserItems] = useState<Product[]>([]);

  async function fetchUser() {
    // TODO: This is currently getting the user id from the auth0 token
    // it might be useful to get it from the URL,
    // however, the URL includes the username (user1), not the auth0 id
    // and there's no endpoint that returns the products based on the username
    const token = await getAccessTokenSilently();
    const extUser = await getUserInfoByAuth0Id(user?.sub, token);
    console.log(extUser.data[0]._id);
    const res = await getProductsOwnedByUser(extUser.data[0]._id, token);
    if (res) {
      setUserItems(res.data);
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
