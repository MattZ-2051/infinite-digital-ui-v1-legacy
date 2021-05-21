import { useEffect, useState } from 'react';

const usePriceFormatter = (price?: number | string): string => {
  const [formattedPrice, setFormattedPrice] = useState('');
  const valueSymbols = ['K', 'M', 'B', 'T'];

  const formatter = (price: number): string => {
    if (price <= 0) {
      return '0';
    }
    const log = Math.trunc((Math.log10(price) / 3) | 0);
    if (log <= 0) {
      return `${price}`;
    }

    const numericPart = Math.trunc(price / Math.pow(1000, log <= 4 ? log : 4));
    const literalPart =
      log >= valueSymbols.length - 1
        ? valueSymbols[valueSymbols.length - 1]
        : valueSymbols[log - 1];
    return `~${numericPart}${literalPart}`;
  };

  useEffect(() => {
    if (typeof price === 'number') {
      return setFormattedPrice(formatter(price));
    }
    try {
      const priceInt = parseInt(price || '0');
      setFormattedPrice(formatter(priceInt));
    } catch {
      setFormattedPrice('Not a number');
    }
  }, [price]);

  return formattedPrice;
};

export default usePriceFormatter;
