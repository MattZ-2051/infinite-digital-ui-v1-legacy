import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { ITransaction } from 'entities/transaction';
import { ReactComponent as linkSVG } from 'assets/svg/icons/link-icon.svg';
import { useHistory } from 'react-router-dom';

const S: any = {};

interface Props {
  transaction: ITransaction;
}

const Transaction = ({ transaction }: Props) => {
  const [showLink, setShowLink] = useState<boolean>(false);
  const history = useHistory();

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
          {transaction.type === 'purchase' && (
            <S.FlexDiv>
              <S.Description>Bought for</S.Description>
              <S.Amount>${transaction.transactionData.amount}</S.Amount>
            </S.FlexDiv>
          )}
          {transaction.type === 'mint' && (
            <S.FlexDiv>
              <S.Description>Minted by</S.Description>
              <S.UsernameTypeMint onClick={handleRedirectToCollections}>
                @{transaction.owner.username}
              </S.UsernameTypeMint>
            </S.FlexDiv>
          )}
          {transaction.type === 'transfer' && (
            <S.FlexDiv>
              <S.Description>Transferred to @username</S.Description>
              <S.Amount>${transaction.transactionData.amount}</S.Amount>
            </S.FlexDiv>
          )}
          {transaction.type === 'sale' && (
            <S.FlexDiv>
              <S.Description>Sold for</S.Description>
              <S.Amount>${transaction.transactionData.amount}</S.Amount>
            </S.FlexDiv>
          )}
          <S.Date>{transaction.createdAt}</S.Date>
        </S.TransactionDetails>
      </S.TransactionInfo>
      <div
        style={{ position: 'relative' }}
        onMouseEnter={() => setShowLink(true)}
        onMouseLeave={() => setShowLink(false)}
      >
        {showLink && (
          <S.HederaLink>
            <span>hedera link</span>
          </S.HederaLink>
        )}
        <S.LinkIcon className="icon_link" />
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

S.HederaLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: black;
  height: 40px;
  width: 190px;
  position: absolute;
  right: 20%;
  bottom: 30px;
  border-radius: 35px;
  :hover {
    cursor: pointer;
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
  align-items: flex-end;
`;

S.LinkIcon = styled(linkSVG)`
  width: 40px;
  stroke: #9e9e9e;
  fill: none;
  :hover {
    stroke: white;
    cursor: pointer;
    transform: scale(1.1);
  }
`;

S.Description = styled.span`
  color: #9e9e9e;
  font-weight: 600;
  font-size: 16px;
`;

S.FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

S.Amount = styled.span`
  color: white;
  font-weight: 600;
  font-size: 16px;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

S.Date = styled.span`
  font-size: 14px;
  color: #9e9e9e;
`;

S.Username = styled.span`
  font-size: 16px;
  color: #9e9e9e;
  :hover {
    cursor: pointer;
    color: white;
    transform: scale(1.1);
  }
`;

export default Transaction;
