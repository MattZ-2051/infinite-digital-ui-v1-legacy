import React from 'react';
import { FileAsset } from 'entities/sku';
import * as S from './styles';
import AssetItem from './assetItem';

interface IProps {
  assets: FileAsset[];
  owner: boolean;
  productId: string;
}

const OwnerAccessList = ({ assets, owner, productId }: IProps) => {
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
            />
          );
        })}
      </S.TransactionOwnerAccess>
    </>
  ) : (
    <div>There are not items yet</div>
  );
};

export default OwnerAccessList;
