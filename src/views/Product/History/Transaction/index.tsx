import React, { useState } from 'react';
import { ITransaction } from 'entities/transaction';
import { Bid } from 'entities/bid';
import { useHistory } from 'react-router-dom';
import { formatDate } from 'utils/dates';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import * as S from './styles';

interface Props {
  transaction?: ITransaction;
  bid?: Bid;
}

const Transaction = ({ transaction, bid }: Props) => {
  const [showLink, setShowLink] = useState<boolean>(false);
  const history = useHistory();
  const matchesMobile = useMediaQuery('(max-width:1140px)');

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
      <S.Container>
        <S.Username className="username" onClick={handleRedirectToCollections}>
          @{transaction?.owner.username}
        </S.Username>

        <S.TransactionInfo padding="0 0 0 10px">
          <S.TransactionDetails>
            {transaction?.type === 'purchase' &&
              transaction?.status === 'success' && (
                <S.FlexDiv>
                  <S.Description>Bought for</S.Description>
                  <S.Amount>
                    ${transaction?.transactionData.cost?.totalCost.toFixed(2)}
                  </S.Amount>
                </S.FlexDiv>
              )}
            {transaction?.type === 'nft_mint' && (
              <S.FlexDiv>
                <S.Amount>NFT Minted</S.Amount>
              </S.FlexDiv>
            )}
            {transaction?.type === 'nft_transfer_manual' && (
              <S.FlexDiv>
                <S.Amount>Recieved Transfer</S.Amount>
              </S.FlexDiv>
            )}
            {/* removed for now */}
            {/* {transaction.type === 'sale' && (
            <S.FlexDiv>
              <S.Description>Sold for</S.Description>
              <S.Amount>${transaction.transactionData.amount}</S.Amount>
            </S.FlexDiv>
          )} */}

            <S.Date>
              {transaction && formatDate(new Date(transaction?.updatedAt))}
            </S.Date>
          </S.TransactionDetails>
        </S.TransactionInfo>
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
          {showLink && matchesMobile && (
            <div>
              {/* <S.ToolTip></S.ToolTip>
            <S.ToolTipText>
              <a
                href={transaction.transactionData?.explorerLink}
                target="_blank"
                rel="noreferrer"
              >
                See transaction
              </a>
            </S.ToolTipText> */}
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
      </S.Container>
    );
  } else {
    return (
      <S.Container>
        <S.Username className="username" onClick={handleRedirectToCollections}>
          @{bid?.owner.username}
        </S.Username>
        <S.TransactionInfo padding="0 0 0 10px">
          <S.TransactionDetails>
            <S.FlexDiv>
              <S.Description>Bid for</S.Description>
              <S.Amount>${bid?.bidAmt}</S.Amount>
            </S.FlexDiv>
            <S.Date>{bid && formatDate(new Date(bid?.createdAt))}</S.Date>
          </S.TransactionDetails>
        </S.TransactionInfo>
      </S.Container>
    );
  }
};

export default Transaction;
