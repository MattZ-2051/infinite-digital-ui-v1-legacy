import React, { useState } from 'react';
import { ITransaction } from 'entities/transaction';
import { Bid } from 'entities/bid';
import { useHistory } from 'react-router-dom';
import { formatDate } from 'utils/dates';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BidHistoryModal from '../../Modal/BidHistoryModal';
import AuctionTx from './TxTypes/AuctionTx';
import BidTx from './TxTypes/BidTx';
import PurchaseTx from './TxTypes/PurchaseTx';
import RedeemTx from './TxTypes/RedeemTx';
import * as S from './styles';

export interface Props {
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
        <S.Container className={!isNftRedeemTx ? 'with-link' : ''}>
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
            {!isNftRedeemTx && (
              <S.TransactionDetails alignItems="flex-start">
                {isPurchaseTx && <PurchaseTx transaction={transaction} />}
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
                {!isAuctionTx && (
                  <S.Date width={matchesMobile && isNftMintTx ? '90px' : ''}>
                    {transaction &&
                      formatDate(new Date(transaction?.updatedAt))}{' '}
                  </S.Date>
                )}
              </S.TransactionDetails>
            )}
            {isNftRedeemTx && <RedeemTx transaction={transaction} />}
          </S.TransactionInfo>
          {!isNftRedeemTx && (
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
        {showBidModal && isAuctionTx && (
          <BidHistoryModal
            visible={showBidModal}
            listingId={transaction?.transactionData?.listing}
            setModalVisibility={setShowBidModal}
            endDate={transaction?.transactionData.endDate}
            serialNumber={transaction?.transactionData?.product?.serialNumber}
            sku={transaction?.transactionData?.sku}
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
