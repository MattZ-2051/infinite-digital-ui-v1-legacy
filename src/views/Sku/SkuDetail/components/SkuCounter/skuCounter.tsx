import { Sku } from 'entities/sku';
import React from 'react';

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
    return <>{sku.totalSupplyUpcoming} to be released</>;
  } else {
    // released
    if (sku.totalSupply > 0) {
      return <>{sku.totalSupplyLeft} released</>;
    } else {
      // weird edge case that we're not expecting
      return <></>;
    }
  }
};
