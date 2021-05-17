import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import ProductTile from 'views/MarketPlace/components/ProductTile';
import { ProductWithFunctions } from 'entities/product';
import { getProductsOwnedByUser } from 'services/api/productService';
import { getMe } from 'services/api/userService';
import { useAuth0 } from '@auth0/auth0-react';

export const MyCollection = (): JSX.Element => {
  const [userItems, setUserItems] = useState<ProductWithFunctions[]>([]);
  const { getAccessTokenSilently } = useAuth0();

  async function fetchUser() {
    const token = await getAccessTokenSilently();
    const extUser = await getMe(token);
    const res = await getProductsOwnedByUser(extUser._id, token);
    if (res.data) {
      setUserItems(res.data);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <S.ProductContainer>
        {userItems instanceof Array &&
          userItems.map((product, index) => {
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

const S: any = {};

S.TileContainer = styled.div<{ index: number }>`
  padding-left: ${({ index }) => `${index === 0 ? '0px' : '10px'}`};
  padding: 0 20px;
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
