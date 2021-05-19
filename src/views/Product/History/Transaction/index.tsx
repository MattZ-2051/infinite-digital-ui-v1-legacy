import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { ITransaction } from 'entities/transaction';
import { ReactComponent as linkSVG } from 'assets/svg/icons/link-icon.svg';
import { useHistory } from 'react-router-dom';
import { formatDate } from 'utils/dates';
import { ReactComponent as ToolTip } from 'assets/svg/icons/tooltip.svg';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const S: any = {};

interface Props {
  transaction: ITransaction;
}

const Transaction = ({ transaction }: Props) => {
  const [showLink, setShowLink] = useState<boolean>(false);
  const history = useHistory();
  const matchesMobile = useMediaQuery('(max-width:1140px)');

  const handleRedirectToCollections = () => {
    history.push(`/collection/${transaction.owner.id}`);
  };

  return (
    <S.Container>
      <S.Username className="username" onClick={handleRedirectToCollections}>
        @{transaction.owner.username}
      </S.Username>
      <S.TransactionInfo>
        <S.TransactionDetails>
          {transaction.type === 'purchase' && transaction.status === 'success' && (
            <S.FlexDiv>
              <S.Description>Bought for</S.Description>
              <S.Amount>
                ${transaction.transactionData.cost?.totalCost.toFixed(2)}
              </S.Amount>
            </S.FlexDiv>
          )}
          {transaction.type === 'nft_mint' && (
            <S.FlexDiv>
              <S.Amount>NFT Minted</S.Amount>
            </S.FlexDiv>
          )}
          {transaction.type === 'nft_transfer_manual' && (
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
          <S.Date>{formatDate(new Date(transaction.updatedAt))}</S.Date>
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
                href={transaction.transactionData?.explorerLink}
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
          href={transaction.transactionData?.explorerLink}
          target="_blank"
          rel="noreferrer"
        >
          <S.LinkIcon className="icon_link" />
        </a>
      </div>
    </S.Container>
  );
};

S.Container = styled.div`
  border-top: 1px solid #2e2e2e;
  border-bottom: 1px solid #2e2e2e;
  padding: 32px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  :hover {
    border-bottom: 1px solid white;
  }
  :hover .username {
    color: white;
  }
`;

S.UsernameTypeMint = styled.span`
  color: white;
  font-weight: 600;
  font-size: 16px;
  padding-left: 10px;
`;

S.ToolTip = styled(ToolTip)`
  position: absolute;
  bottom: 30px;
  color: black;
  right: -3.7em;
  width: 160px;
  :hover {
    cursor: pointer;
  }
  @media screen and (max-width: 1160px) {
    position: absolute;
    bottom: 30px;
    color: black;
    right: 0;
    :hover {
      cursor: pointer;
    }
  }
`;

S.ToolTipText = styled.span`
  position: absolute;
  bottom: 3em;
  color: black;
  width: 175px;
  overflow: hidden;
  font-size: 14px;
  left: -4.5em;
  text-align: center;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
  a {
    font-weight: 400;
  }

  @media screen and (max-width: 960px) {
    position: absolute;
  bottom: 3.5em;
  color: black;
  width: 95px;
  overflow: hidden;
  font-size: 12px;
  left: -6em;

  text-align: center;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
  a {
    font-weight: 400;
  }
`;

S.Link = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: black;
  height: 40px;
  width: 190px;
  position: absolute;
  bottom: 30px;
  border-radius: 35px;
  overflow: hidden;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

S.TransactionInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

S.TransactionDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 10px;
  justify-content: center;
  align-items: flex-start;
`;

S.LinkIcon = styled(linkSVG)`
  width: 40px;
  stroke: #9e9e9e;
  fill: none;
  :hover {
    stroke: white;
    cursor: pointer;
  }
`;

S.Description = styled.span`
  color: #9e9e9e;
  font-weight: 600;
  font-size: 16px;
  padding-right: 10px;
`;

S.FlexDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

S.Amount = styled.span`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

S.Date = styled.span`
  font-size: 13px;
  color: #9e9e9e;
`;

S.Username = styled.p`
  font-size: 16px;
  margin: 0;
  width: 80px;
  color: #9e9e9e;
  :hover {
    cursor: pointer;
    color: white;
  }
`;

export default Transaction;