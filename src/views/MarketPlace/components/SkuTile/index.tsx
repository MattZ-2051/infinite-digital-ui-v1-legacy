import React from 'react';
import Tile from 'components/ProductTiles/Tile';
import { Sku } from 'entities/sku';
import { formatCountdown } from 'utils/dates';
import { useHistory } from 'react-router-dom';

interface SkuProps {
  sku: Sku;
}

const SkuTile = ({ sku }: SkuProps): JSX.Element => {
  const {
    _id,
    minPrice,
    issuer,
    name,
    graphicUrl,
    rarity,
    circulatingSupply,
    totalSupplyLeft,
    totalSupplyUpcoming,
    series,
    minStartDate,
    redeemable,
    maxSupply,
    supplyType,
  } = sku;

  const history = useHistory();
  const skuStartDateTime = new Date(minStartDate || '').getTime();
  const currentTime = new Date().getTime();

  let status: /*SKU Tile Types*/ 'upcoming' | 'active' | 'no-sale' | '' = '';
  let skuUpcomingTime = '';
  let bottomRightText: string | number = '';
  let pillInfo: string | number = '';

  const checkStatus = () => {
    if (skuStartDateTime > currentTime) {
      status = 'upcoming';
      bottomRightText = totalSupplyUpcoming;
      skuUpcomingTime = formatCountdown(minStartDate || new Date());
      pillInfo = skuUpcomingTime;
      return;
    } else if (totalSupplyLeft > 0) {
      status = 'active';
      bottomRightText = totalSupplyLeft;
      pillInfo = minPrice;
      return;
    } else if (totalSupplyLeft === 0) {
      status = 'no-sale';
      bottomRightText = circulatingSupply;
      return;
    } else {
      return;
    }
  };

  checkStatus();
  const handleRedirect = () => {
    history.push(`/marketplace/${_id}`);
  };

  return (
    <Tile
      sku={sku}
      topLeft={issuer?.username}
      skuRarity={rarity}
      middle={name}
      bottomLeft={series?.name}
      bottomRight={bottomRightText}
      status={status}
      redeemable={redeemable}
      pillInfo={pillInfo}
      skuImg={graphicUrl}
      unique={maxSupply === 1}
      handleRedirect={handleRedirect}
      supplyType={supplyType}
    />
  );
};

export default SkuTile;
