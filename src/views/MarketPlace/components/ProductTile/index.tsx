import React from 'react';
import Tile from 'components/ProductTiles/Tile';
import redeemIcon from 'assets/img/icons/redeem-icon-2.png';
import { Sku } from 'entities/sku';

interface Props {
  sku: Sku;
  productSerialNumber: string;
  pillInfo?: string;
  redeemable: boolean;
  status?: string;
}

const ProductTile = ({
  sku,
  productSerialNumber,
  pillInfo,
  status,
}: Props): JSX.Element => {
  return (
    <Tile
      sku={sku}
      redeemable={true}
      status={'active-listing'}
      icon={redeemIcon}
      skuImg={sku.graphicUrl}
      skuRarity={sku.rarity}
      topLeft={sku.issuerName}
      middle={sku.name}
      bottomLeft={sku.series.name}
      bottomRight={productSerialNumber?.toString()}
      pillInfo={pillInfo}
    />
  );
};

export default ProductTile;
