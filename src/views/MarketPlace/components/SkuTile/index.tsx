import React from 'react';
import Tile from 'components/ProductTiles/Tile';
import { Sku } from 'entities/sku';

interface SkuProps {
  sku: Sku;
}

const SkuTile = ({ sku }: SkuProps): JSX.Element => {
  const {
    startDate,
    minPrice,
    issuer,
    name,
    graphicUrl,
    rarity,
    circulatingSupply,
    totalSupplyLeft,
    totalSupplyUpcoming,
    series,
  } = sku;

  const currentTime = new Date().getTime();
  const skuStartDateTime = new Date(
    // TODO: hardcoded date?
    startDate || '2021-04-12T19:03:02.439Z'
  ).getTime();
  let status: /*SKU Tile Types*/
  | 'upcoming'
    | 'active'
    | 'no-sale'
    | /*Product Tile Types */ 'unique'
    | 'purchased'
    | 'active-listing'
    | 'no-active-listing'
    | '' = '';
  let skuUpcomingTime = '';
  let bottomRightText: any = '';
  let pillInfo: any = '';

  function calcDiff(currentDate, skuStartDate) {
    let diff = (skuStartDate - currentDate) / 1000;
    diff = Math.abs(Math.floor(diff));

    const days = Math.floor(diff / (24 * 60 * 60));
    let leftSec = diff - days * 24 * 60 * 60;

    const hrs = Math.floor(leftSec / (60 * 60));
    leftSec = leftSec - hrs * 60 * 60;

    const min = Math.floor(leftSec / 60);
    leftSec = leftSec - min * 60;

    return days + 'd' + ' ' + hrs + 'hr' + ' ' + min + 'm';
  }

  const checkStatus = () => {
    if (skuStartDateTime > currentTime) {
      status = 'upcoming';
      bottomRightText = totalSupplyUpcoming;
      skuUpcomingTime = calcDiff(currentTime, skuStartDateTime);
      pillInfo = skuUpcomingTime;
      return;
    } else if (totalSupplyLeft > 0) {
      status = 'active';
      bottomRightText = totalSupplyLeft;
      pillInfo = minPrice;
      return;
    } else if (minPrice === 0 || !minPrice) {
      status = 'no-sale';
      bottomRightText = circulatingSupply;
      return;
    } else {
      return;
    }
  };

  checkStatus();

  return (
    <Tile
      sku={sku}
      topLeft={issuer?.username}
      skuRarity={rarity}
      middle={name}
      bottomLeft={series?.name}
      bottomRight={bottomRightText}
      status={status}
      redeemable={false}
      pillInfo={pillInfo}
      skuImg={graphicUrl}
    />
  );
};

export default SkuTile;
