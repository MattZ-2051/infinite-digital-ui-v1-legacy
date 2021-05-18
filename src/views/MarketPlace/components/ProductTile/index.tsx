import React from 'react';
import Tile from 'components/ProductTiles/Tile';
import { ProductWithFunctions } from 'entities/product';
import { useHistory } from 'react-router-dom';
import { formatCountdown } from 'utils/dates';

interface Props {
  product: ProductWithFunctions;
  productSerialNumber: string;
  themeStyle: 'light' | 'dark';
}

const ProductTile = ({
  product,
  productSerialNumber,
  themeStyle = 'light',
}: Props): JSX.Element => {
  let status: /*Product Tile Types */
  'active-listing' | 'no-active-listing' | 'upcoming-product-time' | '' = '';
  const history = useHistory();
  const { sku } = product;
  let pillInfo = '';
  const handleRedirect = () => {
    history.push(`/product/${product._id}`);
  };

  const checkStatus = (product) => {
    if (product?.upcomingProductListings?.length !== 0) {
      status = 'upcoming-product-time';
      pillInfo = formatCountdown(
        new Date(product?.upcomingProductListings[0]?.startDate)
      );
      return status;
    } else if (product?.activeProductListings.length !== 0) {
      status = 'active-listing';
      pillInfo = product?.activeProductListings[0].price;
      return status;
    } else if (
      product?.activeProductListings.length === 0 &&
      product?.upcomingProductListings?.length === 0
    ) {
      status = 'no-active-listing';
      return status;
    }
  };
  checkStatus(product);

  return (
    <Tile
      themeStyle={themeStyle}
      sku={sku}
      redeemable={sku.redeemable}
      status={status}
      skuImg={sku.graphicUrl}
      skuRarity={sku.rarity}
      topLeft={sku.issuerName}
      middle={sku.name}
      bottomLeft={sku.series?.name}
      bottomRight={productSerialNumber?.toString()}
      pillInfo={pillInfo}
      unique={sku.maxSupply === 1}
      handleRedirect={handleRedirect}
      supplyType={sku.supplyType}
    />
  );
};

export default ProductTile;
