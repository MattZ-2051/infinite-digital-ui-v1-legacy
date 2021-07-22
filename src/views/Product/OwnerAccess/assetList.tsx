import React, { useState, useCallback } from 'react';
import { FileAsset } from 'entities/fileAsset';
import * as S from './styles';
import AssetItem from './assetItem';

interface IProps {
  assets: FileAsset[];
  owner: boolean;
  productId: string;
  themeStyle: 'light' | 'dark';
}

const OwnerAccessList = ({ assets, owner, productId, themeStyle }: IProps) => {
  return assets && assets.length ? (
    <>
      {!owner && (
        <S.ContainerNoOwnerText>
          Owners of this NFT are granted access to download these assets
        </S.ContainerNoOwnerText>
      )}
      <S.TransactionOwnerAccess>
        {assets.map((asset) => {
          return (
            <AssetItem
              key={asset.key}
              asset={asset}
              owner={owner}
              productId={productId}
              themeStyle={themeStyle}
            />
          );
        })}
      </S.TransactionOwnerAccess>
    </>
  ) : null;
};

export default OwnerAccessList;
