import React, { useState } from 'react';
import { ITransaction } from 'entities/transaction';
import { Bid } from 'entities/bid';
import { useHistory } from 'react-router-dom';
import { formatDate } from 'utils/dates';
import {
  AuctionTx,
  BidTx,
  PurchaseTx,
  RedeemTx,
  GiveawayTx,
} from './TxTypes/index';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BidHistoryModal from '../../Modal/BidHistoryModal';
import * as S from './styles';

export interface Props {
  transaction?: ITransaction;
  bid?: Bid;
}

const Transaction = ({ transaction, bid }: Props) => {
  const [showLink, setShowLink] = useState<boolean>(false);
  const history = useHistory();
  const matchesMobile = useMediaQuery('(max-width:1140px)');
  const matchesSmScreen = useMediaQuery('(max-width:576px)');
  const [showBidModal, setShowBidModal] = useState<boolean>(false);
  const isAuctionTx =
    transaction &&
    transaction.type === 'purchase' &&
    transaction.transactionData.saleType === 'auction' &&
    transaction?.status === 'success';

  const isPurchaseTx =
    transaction?.type === 'purchase' &&
    transaction.transactionData.saleType !== 'auction' &&
    transaction?.status === 'success';
  const isNftRedeemTx = transaction?.type === 'nft_redeem';
  const isNftMintTx = transaction?.type === 'nft_mint';
  const isNftTransferManualTx = transaction?.type === 'nft_transfer_manual';
  const isGiveawayTx = transaction?.type === 'nft_claim_giveaway';
  const winningAmt = transaction?.transactionData?.cost?.totalCost;

  const handleRedirectToCollections = () => {
    if (transaction) {
      history.push(`/collection/${transaction?.owner.username}`);
    }
    if (bid) {
      history.push(`/collection/${bid?.owner.username}`);
    }
  };

  const DesktopTransaction = () => {
    return (
      <>
        <S.Username className="username" onClick={handleRedirectToCollections}>
          @{transaction?.owner.username}
        </S.Username>
        <S.TransactionInfo padding="0 0 0 10px">
          {!isNftRedeemTx && (
            <S.TransactionDetails alignItems="flex-start">
              {isPurchaseTx && <PurchaseTx transaction={transaction} />}
              {isGiveawayTx && (
                <GiveawayTx
                  transaction={transaction}
                  transferredFromUsername={transaction?.owner?.username}
                  matchesMobile={matchesMobile}
                />
              )}
              {isNftMintTx && (
                <S.FlexDiv>
                  <S.Text>NFT Minted</S.Text>
                </S.FlexDiv>
              )}
              {isNftTransferManualTx && (
                <S.FlexDiv>
                  <S.Text>Recieved Transfer</S.Text>
                </S.FlexDiv>
              )}
              {isAuctionTx && (
                <AuctionTx
                  transaction={transaction}
                  setShowBidModal={setShowBidModal}
                />
              )}
              {!isAuctionTx && !isGiveawayTx && (
                <S.Date width={matchesMobile && isNftMintTx ? '90px' : ''}>
                  {transaction && formatDate(new Date(transaction?.updatedAt))}{' '}
                </S.Date>
              )}
            </S.TransactionDetails>
          )}
          {isNftRedeemTx && <RedeemTx transaction={transaction} />}
        </S.TransactionInfo>
      </>
    );
  };

  const MobileTransaction = () => {
    return (
      <div>
        <S.Username className="username" onClick={handleRedirectToCollections}>
          @{transaction?.owner.username}
        </S.Username>
        <S.TransactionInfo padding="0 0 0 10px">
          {!isNftRedeemTx && (
            <S.TransactionDetails alignItems="flex-start">
              {isPurchaseTx && <PurchaseTx transaction={transaction} />}
              {isNftMintTx && (
                <S.FlexDiv>
                  <S.Text>NFT Minted</S.Text>
                </S.FlexDiv>
              )}
              {isGiveawayTx && (
                <GiveawayTx
                  transaction={transaction}
                  transferredFromUsername={transaction?.owner?.username}
                  matchesMobile={matchesMobile}
                />
              )}
              {isNftTransferManualTx && (
                <S.FlexDiv>
                  <S.Text>Recieved Transfer</S.Text>
                </S.FlexDiv>
              )}
              {isAuctionTx && (
                <AuctionTx
                  transaction={transaction}
                  setShowBidModal={setShowBidModal}
                />
              )}
              {!isAuctionTx && !isGiveawayTx && (
                <S.Date width={matchesMobile && isNftMintTx ? '90px' : ''}>
                  {transaction && formatDate(new Date(transaction?.updatedAt))}{' '}
                </S.Date>
              )}
            </S.TransactionDetails>
          )}
          {isNftRedeemTx && <RedeemTx transaction={transaction} />}
        </S.TransactionInfo>
      </div>
    );
  };

  if (transaction) {
    return (
      <>
        <S.Container className={!isNftRedeemTx ? 'with-link' : ''}>
          {matchesSmScreen ? <MobileTransaction /> : <DesktopTransaction />}
          {!isNftRedeemTx && (
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setShowLink(true)}
              onMouseLeave={() => setShowLink(false)}
            >
              {showLink && !matchesSmScreen && (
                <div>
                  <S.ToolTip/>
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
              {matchesSmScreen && isAuctionTx && (
                <S.AuctionIcon
                  className="icon_link"
                  onClick={() => setShowBidModal(true)}
                />
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
        {showBidModal && isAuctionTx && (
          <BidHistoryModal
            visible={showBidModal}
            listingId={transaction?.transactionData?.listing}
            setModalVisibility={setShowBidModal}
            endDate={transaction?.transactionData.endDate}
            serialNumber={transaction?.transactionData?.product?.serialNumber}
            sku={transaction?.transactionData?.sku}
            winningAmt={winningAmt}
          />
        )}
      </>
    );
  } else if (bid) {
    return (
      <BidTx
        bid={bid}
        handleRedirectToCollections={handleRedirectToCollections}
      />
    );
  } else {
    console.error('unknown transaction type');
    return null;
  }
};

export default Transaction;
