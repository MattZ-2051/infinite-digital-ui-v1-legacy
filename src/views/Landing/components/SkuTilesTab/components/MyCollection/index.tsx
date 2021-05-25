import { useEffect, useState } from 'react';
import ProductTile from 'views/MarketPlace/components/ProductTile';
import { ProductWithFunctions } from 'entities/product';
import { getProductsOwnedByUser } from 'services/api/productService';
import { getMe } from 'services/api/userService';
import { useAuth0 } from '@auth0/auth0-react';
import * as S from './styles';

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
