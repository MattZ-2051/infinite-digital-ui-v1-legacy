import React, { useEffect, useState, useRef } from 'react';
import * as S from './styles';
import { FileAsset } from 'entities/sku';
import { withStyles } from '@material-ui/core/styles';
import { useAuth0 } from '@auth0/auth0-react';
import { bytesToSize } from 'utils/convert';
import Tooltip from '@material-ui/core/Tooltip';
import { downloadAssetFile } from 'services/api/productService';
import alreadyDownload from 'assets/svg/icons/download-white.svg';
import downloadIcon from 'assets/svg/icons/download-icon.svg';
import loadingGif from 'assets/gif/loading.gif';

interface IProps {
  asset: FileAsset;
  owner: boolean;
  productId: string;
}
const LightTooltip = withStyles((theme) => ({
  arrow: {
    color: theme.palette.common.white,
  },
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: '#000000',
    boxShadow: theme.shadows[1],
    lineHeight: '18px',
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 999,
  },
}))(Tooltip);

const AssetItem = ({ asset, owner, productId }: IProps) => {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  console.log(asset);
  const { getAccessTokenSilently } = useAuth0();
  const [download, setDownload] = useState<boolean>(false);
  const [presignedUrl, setPresignedUrl] = useState<string | null>(null);

  const splitKey = asset.key.split('/');
  let assetName = '';
  if (splitKey) {
    assetName = splitKey[splitKey.length - 1];
  }
  const assetType = asset.type.split('/')[0];

  const handleDownload = async () => {
    const link = anchorRef.current;
    if (!link) return;
    setDownload(true);
    const userToken = await getAccessTokenSilently();
    let resp;
    try {
      resp = await downloadAssetFile(userToken, productId, asset.key);
    } catch (err) {
      console.log(err);
      setDownload(false);
      return;
    }
    setPresignedUrl(resp.presignedUrl);
    link.href = resp.presignedUrl;
    link.setAttribute('target', '_blank');
    link.setAttribute('download', assetName);
    link.click();
    setDownload(false);
  };

  return (
    <S.RowOwnerAccess>
      {/* <div key={asset.key}>{asset.key}</div> */}
      <S.RowContainerOwnerDescription owner={owner}>
        <span>{assetName}</span>
        <S.ContainerTypeFile>
          <span>Type: {assetType}&nbsp;</span>
          <span>{bytesToSize(asset.size)}</span>
        </S.ContainerTypeFile>
      </S.RowContainerOwnerDescription>
      {owner && (
        <S.ContainerDownloadIcon>
          <LightTooltip arrow title="Click to download" placement="top">
            <a ref={anchorRef}>
              {!download ? (
                <img
                  src={presignedUrl ? alreadyDownload : downloadIcon}
                  alt="download-icon"
                  onClick={handleDownload}
                />
              ) : (
                <img src={loadingGif} alt="loading-download-icon" width="20" />
              )}
            </a>
          </LightTooltip>
        </S.ContainerDownloadIcon>
      )}
    </S.RowOwnerAccess>
  );
};

export default AssetItem;
