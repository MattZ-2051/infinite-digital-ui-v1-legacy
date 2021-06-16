import { Sku } from 'entities/sku';

export const createMessage = (sku: Sku): string => {
  if (sku.maxSupply == 1) return '1 of 1 limited edition';

  if (fixed(sku) && (sku.totalSupply > 0 || sku.totalUpcomingSupply > 0))
    return limitedEditions(
      sku.totalSupply > 0 ? sku.totalSupply : sku.totalUpcomingSupply
    );

  if (fixed(sku) && hasListings(sku) && sku?.expiredSkuListings?.length !== 0)
    switch (sku.circulatingSupply) {
      case 0:
        return '';
        break;
      case 1:
        return limitedEditions(sku.circulatingSupply);
        break;
      default:
        return limitedEditions(sku.circulatingSupply);
        break;
    }

  if (variable(sku)) {
    if (sku.circulatingSupply > 0) return `${sku.circulatingSupply} released`;
    if (sku.minStartDate > new Date()) {
      return `${sku.totalUpcomingSupply} to be released`;
    }
  }

  return '';
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

const variable = (sku: Sku): boolean => {
  return sku.supplyType === 'variable';
};
