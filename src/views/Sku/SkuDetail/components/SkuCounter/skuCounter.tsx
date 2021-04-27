import { SkuWithFunctionsPopulated } from 'entities/sku';
import React from 'react';

type SkuCounterProps = {
  sku: SkuWithFunctionsPopulated;
};

export const SkuCounter = ({ sku }: SkuCounterProps): JSX.Element => {
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
      return <>{sku.totalSupplyLeft} to be released</>;
    } else {
      // weird edge case that we're not expecting
      return <></>;
    }
  }
};
