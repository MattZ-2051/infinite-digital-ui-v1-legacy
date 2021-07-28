import { Props } from '../index';
import { formatDate } from 'utils/dates';
import * as S from '../styles';
import { useMediaQuery } from '@material-ui/core';

interface BidTxProps extends Props {
  handleRedirectToCollections: () => void;
}

const BidTx = ({ bid, handleRedirectToCollections }: BidTxProps) => {
  const matchesSmScreen = useMediaQuery('(max-width:576px)');

  return (
    <S.Container
      style={
        matchesSmScreen
          ? { flexDirection: 'column', alignItems: 'flex-start' }
          : {}
      }
    >
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
};

export default BidTx;
