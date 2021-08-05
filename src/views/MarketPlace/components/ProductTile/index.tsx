import React from 'react';
import Tile from 'components/ProductTiles/Tile';
import { ProductWithFunctions } from 'entities/product';
import { useHistory } from 'react-router-dom';
import { formatSkuCountdown } from 'utils/dates';

interface Props {
  product: ProductWithFunctions;
  productSerialNumber: string;
  themeStyle: 'light' | 'dark';
}

/*Product Tile Types */
type ProductTileTypes =
  | 'active-listing'
  | 'no-active-listing'
  | 'upcoming-product-time'
  | '';

const ProductTile = ({
  product,
  productSerialNumber,
  themeStyle = 'light',
}: Props): JSX.Element => {
  let status: ProductTileTypes = '';
  const history = useHistory();
  const { sku } = product;
  let pillInfo: string | number = '';
  const handleRedirect = () => {
    history.push(`/product/${product._id}`);
  };
  const imageUrl = sku.nftPublicAssets
    ? sku.nftPublicAssets[0].previewUrl
      ? sku.nftPublicAssets[0].previewUrl
      : sku.nftPublicAssets[0].url
    : sku.graphicUrl;

  const singleProductListingExist =
    sku?.activeProductListings?.length === 1 && sku.maxSupply === 1;
  const isActiveAuction =
    singleProductListingExist &&
    sku?.activeProductListings[0]?.saleType === 'auction' &&
    sku?.activeProductListings[0]?.status === 'active';

  const checkStatus = (product) => {
    if (product?.upcomingProductListings?.length !== 0) {
      status = 'upcoming-product-time';
      pillInfo = formatSkuCountdown(
        new Date(product?.upcomingProductListings[0]?.startDate)
      );
      return status;
    } else if (product?.activeProductListings.length !== 0) {
      status = 'active-listing';

      if (
        product?.activeProductListings[0]?.saleType === 'auction' &&
        product.minPrice === 0
      ) {
        pillInfo = product?.activeProductListings[0]?.minBid;
      } else {
        pillInfo = product?.activeProductListings[0].price;
      }
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
      skuImg={imageUrl}
      skuRarity={sku.rarity}
      topLeft={sku.issuerName}
      middle={sku.name}
      bottomLeft={sku.series?.name}
      bottomRight={productSerialNumber?.toString()}
      pillInfo={pillInfo}
      unique={sku.maxSupply === 1}
      handleRedirect={handleRedirect}
      supplyType={sku.supplyType}
      isActiveAuction={isActiveAuction}
      singleProductListingExist={singleProductListingExist}
    />
  );
};

export default ProductTile;
