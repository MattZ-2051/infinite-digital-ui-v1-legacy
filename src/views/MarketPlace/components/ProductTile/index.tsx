import React from 'react';
import Tile from 'components/ProductTiles/Tile';
import redeemIcon from 'assets/img/icons/redeem-icon-2.png';

interface IProps {
  img: string;
  name: string;
  series: string;
  rarity: 'uncommon' | 'common' | 'rare' | 'epic' | 'legendary';
  productSerialNumber: number;
  issuer: string;
  purchasedDate?: string;
  redeemable: boolean;
  status?: string;
}

const ProductTile = ({
  img,
  name,
  series,
  rarity,
  productSerialNumber,
  issuer,
  purchasedDate,
  status,
}: IProps) => {
  return (
    <Tile
      redeemable={true}
      status={status || 'active-listing'}
      icon={redeemIcon}
      skuImg={img}
      skuRarity={rarity}
      topLeft={issuer}
      middle={name}
      bottomLeft={series}
      bottomRight={productSerialNumber?.toString()}
      pillInfo={purchasedDate}
    />
  );
};

export default ProductTile;
