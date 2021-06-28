import * as S from '../styles';
import Transaction from '../Transaction';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export const TransactionHistory = ({
  themeStyle,
  historyPage,
  totalTransactions,
  handlers,
  util,
}) => {
  const matchesMobile = useMediaQuery('(max-width:1140px)');
  const perPage = handlers.util.perPage;

  return (
    <S.TransactionHistory>
      <S.TransactionContainer>
        {util.transactionHistory instanceof Array &&
          util.transactionHistory.map((tx, index) => {
            return <Transaction key={tx._id} transaction={tx} />;
          })}
      </S.TransactionContainer>
      {matchesMobile ? (
        <S.FlexDiv justifyContent="center" padding="30px 0 0 0">
          <S.StyledPagination
            themeStyle={themeStyle}
            page={historyPage}
            count={Math.ceil(totalTransactions / perPage)}
            onChange={handlers.handlePagination}
            siblingCount={matchesMobile ? 0 : 1}
          />
        </S.FlexDiv>
      ) : (
        <S.StyledPagination
          themeStyle={themeStyle}
          page={historyPage}
          count={Math.ceil(totalTransactions / perPage)}
          onChange={handlers.handlePagination}
          siblingCount={matchesMobile ? 0 : 1}
        />
      )}
    </S.TransactionHistory>
  );
};
