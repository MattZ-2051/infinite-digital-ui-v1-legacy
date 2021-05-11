import { Link } from 'react-router-dom';
import AuctionItem from './AuctionItem';
import { Collector } from 'entities/collector';
import * as S from './styles';
import Collapsible from '../../components/Collapsible';

export interface Props {
  collectors: Collector[];
  hasProducts: boolean;
}

const AuctionListing = ({ collectors, hasProducts }: Props) => {
  const body = hasProducts ? (
    <S.Items>
      {collectors &&
        collectors.map((el, index) => (
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
              />
            }
          </Link>
        ))}

      {/*
        TODO: see if we still need this (from Matt)
        <ViewAllLink to={'/marketplace/' + collectors[0]?.sku + '/collectors'}>
          View all collectors
        </ViewAllLink> */}
    </S.Items>
  ) : (
    <S.NoOwners>No one owns this item yet</S.NoOwners>
  );

  return (
    <S.Container>
      <Collapsible title="Collectors" body={body} />
    </S.Container>
  );
};

export default AuctionListing;
