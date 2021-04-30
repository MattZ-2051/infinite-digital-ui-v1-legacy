import React from 'react';
import styled from 'styled-components/macro';
import ProductTile from '../../../MarketPlace/components/ProductTile';
import { ProductWithFunctions } from 'entities/product';

interface Props {
  userItems: ProductWithFunctions[] | undefined;
}

const Items = ({ userItems }: Props) => {
  return (
    <Container>
      {userItems &&
        userItems.map((item: ProductWithFunctions, index) => {
          if (item.sku === null) return;
          //TODO add series object to response to grab series name and listing object
          return (
            <TileContainer key={item._id} index={index}>
              <ProductTile
                sku={item.sku}
                redeemable={item.sku.redeemable}
                status={'active-listing'}
                productSerialNumber={item.serialNumber}
                key={item._id}
                pillInfo="1k"
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

const Container = styled.div`
  display: flex;
  overflow: auto;
  width: 100%;
`;

export default Items;
