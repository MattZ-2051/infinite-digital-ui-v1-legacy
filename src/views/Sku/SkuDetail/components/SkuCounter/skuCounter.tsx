import { Sku } from 'entities/sku';
import React from 'react';
import styled from 'styled-components/macro';

type SkuCounterProps = {
  sku: Sku;
};

export const SkuCounter = ({ sku }: SkuCounterProps): JSX.Element => {
  // --- Old Logic commented out 5/24/21 ----
  // if (sku.totalSkuListingSupply == 0) {
  //   return <></>;
  // }

  // if (!sku.minStartDate) {
  //   // weird edge case that we're not expecting
  //   return <>To be released.</>;
  // }

  // if (sku.minStartDate > new Date()) {
  //   // upcoming
  //   return <Info>{sku.totalSupplyUpcoming} to be released</Info>;
  // } else if (sku.supplyType === 'variable' && sku.circulatingSupply > 0) {
  //   return <Info>{sku.circulatingSupply} released</Info>;
  // } else if (sku.supplyType === 'fixed' && sku.totalSupply > 0) {
  //   return (
  //     <Info>
  //       {sku.totalSupply} of {sku.totalSupply}
  //     </Info>
  //   );
  // } else {
  //   // weird edge case that we're not expecting
  //   return <></>;
  // }
  if (sku.maxSupply == 1) {
    return <Info>1 of 1 Limited Edition</Info>;
  }

  if (sku.supplyType === 'fixed' && sku?.skuListings?.length !== 0) {
    if (sku.totalSupplyUpcoming > 0) {
      return <Info>Limited to {sku.totalSupplyUpcoming} editions</Info>;
    } else if (sku.totalSupply > 0) {
      return <Info>Limited to {sku.totalSupply} editions</Info>;
    } else if (
      sku?.expiredSkuListings?.length !== 0 &&
      sku?.circulatingSupply === 0
    ) {
      return <></>;
    } else if (
      sku?.expiredSkuListings?.length !== 0 &&
      sku?.circulatingSupply === 1
    ) {
      return <Info>1 of 1 Limited Edition</Info>;
    } else if (
      sku?.expiredSkuListings?.length !== 0 &&
      sku?.circulatingSupply > 1
    ) {
      return <Info>Limited to {sku.circulatingSupply} editions</Info>;
    }
  }

  if (sku.supplyType === 'fixed' && sku?.skuListings?.length === 0) {
    if (sku.totalSupplyUpcoming > 0) {
      return <Info>Limited to {sku.totalSupplyUpcoming} editions</Info>;
    } else if (sku.totalSupply > 0) {
      return <Info>Limited to {sku.totalSupply} editions</Info>;
    }
  }

  if (sku.supplyType === 'variable' && sku.circulatingSupply > 0) {
    return <Info>{sku.circulatingSupply} released</Info>;
  }

  if (sku.minStartDate > new Date()) {
    // upcoming
    return <Info>{sku.totalSupplyUpcoming} to be released</Info>;
  }
  return <>Checks Failed</>;
};

const Info = styled.p`
  font-size: 16px;
  color: #7c7c7c;
  font-weight: 500;
  margin: 0;
`;
