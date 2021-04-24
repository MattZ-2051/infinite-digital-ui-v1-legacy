import React from 'react';
import Tile from 'components/ProductTiles/Tile';
import redeemIcon from 'assets/img/icons/redeem-icon-2.png';
import { Sku } from 'entities/sku';

interface Props {
  sku: Sku;
  productSerialNumber: number;
  issuer: string;
  purchasedDate?: string;
  redeemable: boolean;
  status?: string;
}

const ProductTile = ({
  sku,
  productSerialNumber,
  issuer,
  purchasedDate,
  status,
}: Props) => {
  return (
    <Tile
      sku={sku}
      redeemable={true}
      status={status || 'active-listing'}
      icon={redeemIcon}
      skuImg={sku.graphicUrl}
      skuRarity={sku.rarity}
      topLeft={issuer}
      middle={sku.name}
      bottomLeft={sku.series.name}
      bottomRight={productSerialNumber?.toString()}
      pillInfo={purchasedDate}
    />
  );
};

export default ProductTile;
