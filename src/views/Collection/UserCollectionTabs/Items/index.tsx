import React from 'react';
import styled from 'styled-components/macro';
import ProductTile from '../../../MarketPlace/components/ProductTile';
import { ProductWithFunctions } from 'entities/product';

interface Props {
  userItems: ProductWithFunctions[] | undefined;
  collection?: boolean;
  theme?: 'light' | 'dark';
}

const Items = ({
  userItems,
  collection,
  theme = 'light',
}: Props): JSX.Element => {
  return (
    <Container collection={collection || false}>
      {userItems &&
        userItems.map((product: ProductWithFunctions, index) => {
          if (product.sku === null) return;
          return (
            <TileContainer theme={theme} key={product._id} index={index}>
              <ProductTile
                theme="dark"
                product={product}
                productSerialNumber={product.serialNumber}
                key={product._id}
              />
            </TileContainer>
          );
        })}
    </Container>
  );
};

const TileContainer = styled.div<{ index: number }>`
  padding: 0 20px;
  padding-left: ${({ index }) => `${index === 0 ? '0px' : '10px'}`};
`;

const Container = styled.div<{ collection?: boolean }>`
  ${({ collection }) =>
    collection
      ? `margin: auto;
  overflow: hidden;
  :hover {
    overflow: auto;
  }
  display: flex;
  flex-wrap: wrap;
  max-height: 80%;
  width: 100%;`
      : `display: flex;
  overflow: auto;
   width: 100%;`}
`;

export default Items;
