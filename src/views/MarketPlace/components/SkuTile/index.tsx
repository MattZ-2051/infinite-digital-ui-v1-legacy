import React from 'react';
import Tile from 'components/ProductTiles/Tile';
import { Sku } from 'entities/sku';

interface SkuProps {
  sku: Sku;
  skuImg: string;
  skuName: string;
  skuSeries: string;
  skuRarity: 'uncommon' | 'common' | 'rare' | 'epic' | 'legendary';
  skuTotalSupplyLeft: number;
  skuStartDate: string;
  skuMinPrice: number;
  skuCirculatingSupply?: number;
  skuTotalSupplyUpcoming?: number;
  redeemable: boolean;
  skuIssuer: string;
}

const SkuTile = ({
  sku,
  skuRarity,
  skuImg,
  skuName,
  skuSeries,
  skuTotalSupplyLeft,
  skuStartDate,
  skuMinPrice,
  skuCirculatingSupply,
  skuTotalSupplyUpcoming,
  skuIssuer,
}: SkuProps) => {
  const currentTime = new Date().getTime();
  const skuStartDateTime = new Date(
    skuStartDate || '2021-04-12T19:03:02.439Z'
  ).getTime();
  let status = '';
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
      bottomRightText = skuTotalSupplyUpcoming;
      skuUpcomingTime = calcDiff(currentTime, skuStartDateTime);
      pillInfo = skuUpcomingTime;
      return;
    } else if (skuTotalSupplyLeft > 0) {
      status = 'active';
      bottomRightText = skuTotalSupplyLeft;
      pillInfo = skuMinPrice;
      return;
    } else if (skuMinPrice === 0 || !skuMinPrice) {
      status = 'no-sale';
      bottomRightText = skuCirculatingSupply;
      return;
    } else {
      return;
    }
  };

  checkStatus();

  return (
    <Tile
      sku={sku}
      topLeft={skuIssuer}
      skuRarity={skuRarity}
      middle={skuName}
      bottomLeft={skuSeries}
      bottomRight={bottomRightText}
      status={status}
      redeemable={false}
      pillInfo={pillInfo}
      skuImg={skuImg}
    />
  );
};

export default SkuTile;
