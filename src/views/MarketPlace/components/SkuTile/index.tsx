import Tile from 'components/ProductTiles/Tile';
import { Sku } from 'entities/sku';
import { formatCountdown, formatSkuCountdown } from 'utils/dates';
import { useHistory } from 'react-router-dom';

interface SkuProps {
  sku: Sku;
  themeStyle: 'light' | 'dark';
}

const SkuTile = ({ sku, themeStyle = 'light' }: SkuProps): JSX.Element => {
  const {
    _id,
    minPrice,
    issuer,
    name,
    graphicUrl,
    rarity,
    circulatingSupply,
    totalSupplyLeft,
    totalUpcomingSupply,
    series,
    minStartDate,
    redeemable,
    maxSupply,
    supplyType,
    productListings,
    skuListings,
    issuerName,
  } = sku;

  const history = useHistory();
  const skuStartDateTime = new Date(minStartDate).getTime();
  const currentTime = new Date().getTime();

  let status: /*SKU Tile Types*/
  'upcoming-sku' | 'active' | 'no-sale' | 'upcoming-sku-time' | '' = '';
  let skuUpcomingTime = '';
  let bottomRightText: string | number = '';
  let pillInfo: string | number = '';

  const checkStatus = () => {
    if (productListings?.length === 0 && skuListings.length === 0) {
      status = 'upcoming-sku';
      return;
    }

    if (
      skuStartDateTime > currentTime &&
      (sku.upcomingProductListings?.length !== 0 ||
        sku.upcomingSkuListings?.length !== 0)
    ) {
      status = 'upcoming-sku-time';
      bottomRightText = totalUpcomingSupply;
      skuUpcomingTime = formatSkuCountdown(new Date(minStartDate));
      pillInfo = skuUpcomingTime;
      return;
    } else if (
      sku.totalSupplyLeft !== 0 &&
      sku.activeSkuListings?.length !== 0
    ) {
      status = 'active';
      bottomRightText = totalSupplyLeft;
      pillInfo = minPrice;
      return;
    } else if (totalSupplyLeft === 0 || sku.activeSkuListings?.length === 0) {
      status = 'no-sale';
      bottomRightText = circulatingSupply;
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
      topLeft={issuerName}
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
      themeStyle={themeStyle}
    />
  );
};

export default SkuTile;
