import { Sku } from 'entities/sku';

export const createMessage = (sku: Sku): string => {
  if (sku.maxSupply == 1) return oneLimitedEdition;

  if (fixed(sku) && sku.totalUpcomingSupply > 0) {
    if (hasListings(sku))
      return limitedEditions(sku.totalUpcomingSupply + sku.totalSupply);
    return limitedEditions(sku.totalUpcomingSupply);
  }

  if (fixed(sku) && sku.totalSupply > 0) {
    if (hasListings(sku)) return limitedEditionMessageSelector(sku.totalSupply);
    return limitedEditions(sku.totalSupply);
  }

  if (fixed(sku) && hasListings(sku) && hasExpiredListings(sku)) {
    if (sku.circulatingSupply == 0) return '';
    return limitedEditionMessageSelector(sku.circulatingSupply);
  }

  if (variable(sku)) {
    if (sku.circulatingSupply > 0) return `${sku.circulatingSupply} released`;
    if (sku.minStartDate > new Date()) {
      return `${sku.totalUpcomingSupply} to be released`;
    }
  }

  return '';
};

const oneLimitedEdition = '1 of 1 limited edition';

const limitedEditionMessageSelector = (quantity: number): string => {
  if (quantity == 1) return oneLimitedEdition;
  return limitedEditions(quantity);
};

const limitedEditions = (quantity: number): string => {
  return `Limited to ${quantity} edition${quantity > 1 ? 's' : ''}`;
};

const fixed = (sku: Sku): boolean => {
  return sku.supplyType == 'fixed';
};

const hasListings = (sku: Sku): boolean => {
  return sku?.skuListings?.length > 0;
};

const hasExpiredListings = (sku: Sku): boolean => {
  return sku?.expiredSkuListings?.length !== 0;
};

const variable = (sku: Sku): boolean => {
  return sku.supplyType === 'variable';
};
