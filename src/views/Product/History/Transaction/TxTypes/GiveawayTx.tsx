import * as S from '../styles';
import { formatDate } from 'utils/dates';

const GiveawayTx = ({
  transaction,
  transferredFromUsername,
  matchesMobile,
}) => {
  return (
    <>
      <S.FlexDiv>
        <S.Description paddingRight="0.5ch">Transferred from</S.Description>
        <S.Text>@{transferredFromUsername}</S.Text>
      </S.FlexDiv>
      <S.Date
        width="100%"
        style={{ textAlign: matchesMobile ? 'start' : 'end' }}
      >
        {transaction && formatDate(new Date(transaction?.updatedAt))}{' '}
      </S.Date>
    </>
  );
};

export default GiveawayTx;
