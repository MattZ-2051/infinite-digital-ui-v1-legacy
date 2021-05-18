import { Sku } from 'entities/sku';
import React from 'react';
import styled from 'styled-components/macro';

type SkuCounterProps = {
  sku: Sku;
};

export const SkuCounter = ({ sku }: SkuCounterProps): JSX.Element => {
  if (sku.totalSkuListingSupply == 0) {
    return <></>;
  }

  if (!sku.minStartDate) {
    // weird edge case that we're not expecting
    return <>To be released.</>;
  }

  if (sku.minStartDate > new Date()) {
    // upcoming
    return <Info>{sku.totalSupplyUpcoming} to be released</Info>;
  } else if (sku.supplyType === 'variable' && sku.circulatingSupply > 0) {
    return <Info>{sku.circulatingSupply} released</Info>;
  } else if (sku.supplyType === 'fixed' && sku.totalSupply > 0) {
    return (
      <Info>
        {sku.totalSupply} of {sku.totalSupply}
      </Info>
    );
  } else {
    // weird edge case that we're not expecting
    return <></>;
  }
};

const Info = styled.p`
  font-size: 16px;
  color: #7c7c7c;
  font-weight: 500;
  margin: 0;
`;
