import { Link } from 'react-router-dom';
import AuctionItem from './AuctionItem';
import { Collector } from 'entities/collector';
import * as S from './styles';
import Collapsible from '../../components/Collapsible';
import { Sku } from 'entities/sku';

export interface Props {
  collectors: Collector[];
  hasProducts: boolean;
  skuId: string;
  sku: Sku;
}

const AuctionListing = ({ collectors, hasProducts, skuId, sku }: Props) => {
  const body = hasProducts ? (
    <S.Items>
      {collectors &&
        collectors.slice(0, 4).map((el, index) => {
          const highestBid = el.highestBid
            ? el.highestBid?.bidAmt
            : el.activeProductListing?.minBid;
          return (
            <Link
              key={index}
              to={'/product/' + el._id}
              style={{ textDecoration: 'none' }}
            >
              {
                <AuctionItem
                  activeProductListing={el.activeProductListing}
                  key={el.serialNumber}
                  listings={el.listings}
                  serialNumber={el.serialNumber}
                  ownerName={el.owner.username}
                  highestBid={highestBid}
                  endDate={el.activeProductListing?.endDate}
                  upcomingProductListing={el.upcomingProductListing}
                />
              }
            </Link>
          );
        })}
      {collectors?.length > 1 ? (
        <S.ViewAll to={`/${skuId}/collectors`}>View all collectors</S.ViewAll>
      ) : null}
    </S.Items>
  ) : (
    <S.NoOwners>Be the first to collect this NFT!</S.NoOwners>
  );
  return (
    <S.Container>
      <Collapsible
        title="Collectors"
        body={body}
        collectorsTotalNum={
          sku.circulatingSupply > 0 ? sku.circulatingSupply : undefined
        }
        borderTitle={true}
      />
    </S.Container>
  );
};

export default AuctionListing;
