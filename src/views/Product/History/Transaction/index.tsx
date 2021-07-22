import React, { useState } from 'react';
import { ITransaction } from 'entities/transaction';
import { Bid } from 'entities/bid';
import { useHistory } from 'react-router-dom';
import { formatDate } from 'utils/dates';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BidHistoryModal from '../components/BidHistoryModal';
import * as S from './styles';

interface Props {
  transaction?: ITransaction;
  bid?: Bid;
}

const Transaction = ({ transaction, bid }: Props) => {
  const cropText = (text: string, limit: number) => {
    return text && text.slice(0, limit) + (text.length > limit ? '...' : '');
  };

  const [showLink, setShowLink] = useState<boolean>(false);
  const history = useHistory();
  const matchesMobile = useMediaQuery('(max-width:1140px)');
  const [showAuctionLink, setShowAuctionLink] = useState<boolean>(false);
  const matchesSmScreen = useMediaQuery('(max-width:576px)');
  const [showBidModal, setShowBidModal] = useState<boolean>(false);

  const handleRedirectToCollections = () => {
    if (transaction) {
      history.push(`/collection/${transaction?.owner.username}`);
    }
    if (bid) {
      history.push(`/collection/${bid?.owner.username}`);
    }
  };

  if (transaction) {
    return (
      <>
        <S.Container
          className={transaction.type !== 'nft_redeem' ? 'with-link' : ''}
        >
          <S.Username
            className="username"
            onClick={handleRedirectToCollections}
          >
            @
            {matchesSmScreen
              ? cropText(transaction?.owner.username, 8)
              : transaction?.owner.username}
          </S.Username>
          <S.TransactionInfo padding="0 0 0 10px">
            {transaction.type !== 'nft_redeem' && (
              <S.TransactionDetails alignItems="flex-start">
                {transaction?.type === 'purchase' &&
                  transaction.transactionData.saleType !== 'auction' &&
                  transaction?.status === 'success' && (
                    <S.FlexDiv>
                      <S.Description paddingRight="0.5ch">
                        Bought for
                      </S.Description>
                      <S.Text>
                        $
                        {transaction?.transactionData.cost?.totalCost.toFixed(
                          2
                        )}
                      </S.Text>
                    </S.FlexDiv>
                  )}
                {transaction?.type === 'nft_mint' && (
                  <S.FlexDiv>
                    <S.Text>NFT Minted</S.Text>
                  </S.FlexDiv>
                )}
                {transaction?.type === 'nft_transfer_manual' && (
                  <S.FlexDiv>
                    <S.Text>Recieved Transfer</S.Text>
                  </S.FlexDiv>
                )}
                {transaction.type === 'purchase' &&
                  transaction.transactionData.saleType === 'auction' &&
                  transaction?.status === 'success' && (
                    <S.TransactionDetails alignItems="flex-end">
                      <S.FlexDiv>
                        <S.Description paddingRight="16px">
                          Closed Auction
                        </S.Description>
                        <S.Text>
                          $
                          {transaction?.transactionData.cost?.totalCost.toFixed(
                            2
                          )}
                        </S.Text>
                      </S.FlexDiv>
                    </S.TransactionDetails>
                  )}
                <S.Date
                  width={
                    matchesMobile && transaction.type === 'nft_mint'
                      ? '90px'
                      : ''
                  }
                >
                  {transaction && formatDate(new Date(transaction?.updatedAt))}
                </S.Date>
              </S.TransactionDetails>
            )}
            {transaction.type === 'nft_redeem' && (
              <S.TransactionDetails alignItems="flex-end">
                <S.FlexDiv style={{ flexWrap: 'nowrap' }}>
                  <S.RedeemIcon />
                  <S.Description paddingRight="0">
                    Redeemed this product
                  </S.Description>
                </S.FlexDiv>
                <S.Date>
                  {transaction && formatDate(new Date(transaction?.updatedAt))}
                </S.Date>
              </S.TransactionDetails>
            )}
          </S.TransactionInfo>
          {transaction.type === 'purchase' &&
            transaction.status === 'success' &&
            transaction.transactionData.saleType === 'auction' && (
              <div
                style={{ position: 'relative' }}
                onMouseEnter={() => setShowAuctionLink(true)}
                onMouseLeave={() => setShowAuctionLink(false)}
              >
                {showAuctionLink && !matchesMobile && (
                  <div>
                    <S.AuctionToolTip></S.AuctionToolTip>
                    <S.AuctionToolTipText onClick={() => setShowBidModal(true)}>
                      See Bids
                    </S.AuctionToolTipText>
                  </div>
                )}
                <S.AuctionIcon
                  className="icon_link"
                  onClick={() => setShowBidModal(true)}
                />
              </div>
            )}
          {transaction.type !== 'nft_redeem' && (
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setShowLink(true)}
              onMouseLeave={() => setShowLink(false)}
            >
              {showLink && !matchesMobile && (
                <div>
                  <S.ToolTip></S.ToolTip>
                  <S.ToolTipText>
                    <a
                      href={transaction?.transactionData?.explorerLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      See transaction
                    </a>
                  </S.ToolTipText>
                </div>
              )}
              <a
                href={transaction?.transactionData?.explorerLink}
                target="_blank"
                rel="noreferrer"
              >
                <S.LinkIcon className="icon_link" />
              </a>
            </div>
          )}
        </S.Container>
        <BidHistoryModal
          visible={showBidModal}
          listingId={transaction?.transactionData?.listing}
          setModalVisibility={setShowBidModal}
          endDate={transaction?.transactionData.endDate}
          serialNumber={transaction?.transactionData?.product?.serialNumber}
          sku={transaction?.transactionData?.sku}
        />
      </>
    );
  } else if (bid) {
    return (
      <S.Container>
        <S.Username className="username" onClick={handleRedirectToCollections}>
          @{bid?.owner.username}
        </S.Username>
        <S.TransactionInfo padding="0 0 0 10px">
          <S.TransactionDetails alignItems="flex-end">
            <S.FlexDiv>
              <S.Description paddingRight="16px">Bid for</S.Description>
              <S.Text>${bid?.bidAmt}</S.Text>
            </S.FlexDiv>
            <S.Date>{bid && formatDate(new Date(bid?.createdAt))}</S.Date>
          </S.TransactionDetails>
        </S.TransactionInfo>
      </S.Container>
    );
  } else {
    return <p>No Transactions</p>;
  }
};

export default Transaction;
