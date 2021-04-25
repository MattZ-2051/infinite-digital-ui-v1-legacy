import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CircularButton from 'components/Buttons/CircularButton';
import ProductTile from 'views/MarketPlace/components/ProductTile';
import { Product } from 'entities/product';
import { getProductsOwnedByUser } from 'services/api/productService';
import { getMe } from 'services/api/userService';
import { useAuth0 } from '@auth0/auth0-react';
import {useAppSelector} from 'hooks/store';

const S: any = {};


export const MyCollection = () => {
  const [userItems, setUserItems] = useState<Product[]>([]);
  const { getAccessTokenSilently, user } = useAuth0();
  const userId = useAppSelector((state) => state.session.user.id);

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
  }, []);

  return (
    <>
      <S.HeaderContainer>
        <S.Header>My Items</S.Header>
        <CircularButton to={`/collection/${userId}`} label="See More" />
      </S.HeaderContainer>
      <S.ProductContainer>
        {userItems instanceof Array &&
          userItems.map((item, index) => {
            let type = 'active-listing';
            const sku = item.sku;
            if (item.listing.status === 'active') {
              type = 'active-listing';
            } else {
              type = 'no-active-listing';
            }

            return (
              <S.TileContainer key={index} index={index}>
                <ProductTile
                  sku={sku}
                  redeemable={true}
                  status={type}
                  productSerialNumber={item.serialNumber}
                  // TODO: replace with issuer name
                  issuer={'adidas'}
                  key={item._id}
                  purchasedDate="1k"
                />
              </S.TileContainer>
            );
          })
        )}
      </S.ProductContainer>
    </>
  );
};

S.TileContainer = styled.div<{ index: number }>`
  padding-left: ${({ index }) => `${index === 0 ? '0px' : '10px'}`};
  padding: 0 20px;
`;

const ProductDiv = styled(({ first, ...rest }) => <div {...rest} />)`
  padding: ${(props) => (props.first ? '0 24px 0 0' : '0 24px')};
`;

S.HeaderContainer = styled.div`
  @media screen and (max-width: 600px) {
    display: flex;
    align-items: center;
    margin: auto;
  }
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding-bottom: 28px;
`;

S.Header = styled.h3`
  padding-top: 40px;
  font-size: 32px;
  line-height: 51.2px;
`;

S.ProductContainer = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  height: 36em;

  @media screen and (max-width: 600px) {
    margin: auto;
    width: 320px;
  }

  ::-webkit-scrollbar {
    height: 0.4em;
  }
  ::-webkit-scrollbar-button {
    width: 0.1em;
  }
  ::-webkit-scrollbar-track-piece {
  }
  ::-webkit-scrollbar-thumb {
    background: var(--grey-40);
    width: 1px !important;
    border-radius: 10px;
  }
`;
