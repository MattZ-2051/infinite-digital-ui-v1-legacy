import { useState } from 'react';
import { Props } from '../index';
import { formatDate } from 'utils/dates';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import * as S from '../styles';
import { ITransaction } from 'entities/transaction';

interface AuctionTxProps extends Props {
  setShowBidModal: (a: boolean) => void;
  transaction?: ITransaction;
}

const AuctionTx = ({ transaction, setShowBidModal }: AuctionTxProps) => {
  const [showAuctionLink, setShowAuctionLink] = useState<boolean>(false);
  const matchesMobile = useMediaQuery('(max-width:1140px)');
  const matchesSmallMobile = useMediaQuery('(max-width:600px)');

  return (
    <S.FlexDiv style={{ position: 'relative' }}>
      {!matchesSmallMobile && (
        <S.AuctionIcon
          className="icon_link"
          onClick={() => setShowBidModal(true)}
          onMouseEnter={() => setShowAuctionLink(true)}
          onMouseLeave={() => setShowAuctionLink(false)}
        />
      )}

      <S.FlexColumn alignItems="flex-start">
        <S.Description
          paddingRight=""
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <div>
            Bought at auction
            <S.Text style={{ paddingLeft: '5px' }}>
              ${transaction?.transactionData.cost?.totalCost.toFixed(2)}
            </S.Text>
          </div>
          <S.Date width="">
            {transaction && formatDate(new Date(transaction?.updatedAt))}{' '}
          </S.Date>
          {showAuctionLink && !matchesMobile && (
            <div
              onMouseEnter={() => setShowAuctionLink(true)}
              onMouseLeave={() => setShowAuctionLink(false)}
            >
              <S.AuctionToolTip></S.AuctionToolTip>
              <S.AuctionToolTipText onClick={() => setShowBidModal(true)}>
                See Bids
              </S.AuctionToolTipText>
            </div>
          )}
        </S.Description>
      </S.FlexColumn>
    </S.FlexDiv>
  );
};

export default AuctionTx;
