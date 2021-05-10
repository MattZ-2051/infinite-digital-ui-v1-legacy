import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CircularButton from 'components/Buttons/CircularButton';
import ProductTile from 'views/MarketPlace/components/ProductTile';
import { useAppSelector } from 'store/hooks';
import { ProductWithFunctions } from 'entities/product';
import { getProductsOwnedByUser } from 'services/api/productService';
import { getMe } from 'services/api/userService';
import { useAuth0 } from '@auth0/auth0-react';

const S: any = {};

export const MyCollection = (): JSX.Element => {
  const [userItems, setUserItems] = useState<ProductWithFunctions[]>([]);
  const { getAccessTokenSilently, user } = useAuth0();
  const userId = useAppSelector((state) => state.session.user.id);

  async function fetchUser() {
    const token = await getAccessTokenSilently();
    const extUser = await getMe(token);
    const res = await getProductsOwnedByUser(extUser._id, token);
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
          userItems.map((product, index) => {
            let type = 'active-listing';
            const sku = product.sku;
            if (product.listing.status === 'active') {
              type = 'active-listing';
            } else {
              type = 'no-active-listing';
            }

            return (
              <S.TileContainer key={index} index={index}>
                <ProductTile
                  themeStyle="light"
                  product={product}
                  productSerialNumber={product.serialNumber}
                  key={product._id}
                />
              </S.TileContainer>
            );
          })}
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
    align-items: baseline;
    margin: auto;
  }
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: baseline;
  padding-bottom: 28px;
`;

S.Header = styled.h3`
  padding-top: 40px;
  font-size: 32px;
  line-height: 51.2px;
  font-weight: 600;
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
