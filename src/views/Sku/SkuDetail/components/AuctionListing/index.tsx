import { Link } from 'react-router-dom';
import AuctionItem from './AuctionItem';
import { Collector } from 'entities/collector';
import * as S from './styles';
import Collapsible from '../../components/Collapsible';

export interface Props {
  collectors: Collector[];
  hasProducts: boolean;
  skuId: string;
}

const AuctionListing = ({ collectors, hasProducts, skuId }: Props) => {
  const body = hasProducts ? (
    <S.Items>
      {collectors &&
        collectors.slice(0, 4).map((el, index) => {
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
                  highestBid={el.activeProductListing?.price}
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
    <S.NoOwners>No one owns this item yet</S.NoOwners>
  );
  return (
    <S.Container>
      <Collapsible
        title="Collectors"
        body={body}
        collectorsTotalNum={collectors.length}
      />
    </S.Container>
  );
};

export default AuctionListing;
