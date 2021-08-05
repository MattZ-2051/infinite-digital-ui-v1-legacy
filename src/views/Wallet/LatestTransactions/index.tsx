import * as S from './styles';
import PageLoader from 'components/PageLoader';
import Pagination from '@material-ui/lab/Pagination';
import Transaction from '../Transaction';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const LatestTransactions = ({
  transactionsLoading,
  transactions,
  perPage,
  valueCurrentPage,
  setCurrentPage,
}) => {
  const matchesMobile = useMediaQuery('(max-width:1140px)');

  return (
    <S.Content>
      {transactionsLoading || !transactions ? (
        <PageLoader size={15} />
      ) : !transactions.data.length ? (
        <S.NoResults>
          <p>Check back here to see your transactions</p>
        </S.NoResults>
      ) : (
        <>
          <S.ProductsGrid>
            {transactions.data.map((tx) => (
              <Transaction tx={tx} key={tx._id} />
            ))}
          </S.ProductsGrid>
          <S.PaginationContainer>
            <Pagination
              count={Math.ceil(transactions.total / perPage)}
              page={valueCurrentPage}
              onChange={(ev, page) => setCurrentPage(page)}
              siblingCount={matchesMobile ? 0 : 1}
            />
          </S.PaginationContainer>
        </>
      )}
    </S.Content>
  );
};

export default LatestTransactions;
