import { useEffect, useState } from 'react';
import * as S from './styles';
import History from './History';
import {
  getSingleProduct,
  getProductTransactionHistory,
} from 'services/api/productService';
import { useHistory } from 'react-router-dom';
import { ProductWithFunctions as ProductType } from 'entities/product';
import ProductDetails from './ProductDetails';
import PageLoader from 'components/PageLoader';
import { ITransaction } from 'entities/transaction';
import { getUserInfoThunk } from 'store/session/sessionThunks';
import { useAppDispatch } from 'store/hooks';
import { useAuth0 } from '@auth0/auth0-react';

const Product = ({}) => {
  const history = useHistory();
  const productId = history.location.pathname.split('/')[2];
  const [product, setProduct] = useState<ProductType | null>(null);
  const [transactionHistory, setTransactionHistory] = useState<
    ITransaction[] | null
  >(null);
  const [totalTransactions, setTotalTransactions] = useState<number>(1);
  const [historyPage, setHistoryPage] = useState<number>(1);
  const perPage = 5;
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const dispatch = useAppDispatch();

  async function fetchData() {
    const productRes = await getSingleProduct(productId);
    const transactionRes = await getProductTransactionHistory(
      productId,
      historyPage,
      perPage
    );

    setProduct(productRes.data);
    setTransactionHistory(transactionRes.data);
    setTotalTransactions(transactionRes.data.length);
  }

  useEffect(() => {
    async function updateUserBalance() {
      if (isAuthenticated) {
        dispatch(getUserInfoThunk({ token: await getAccessTokenSilently() }));
      }
    }

    updateUserBalance();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, []);

  if (!product || !transactionHistory) {
    return <PageLoader />;
  }

  return (
    <S.Content>
      <ProductDetails product={product} />
      <History
        product={product}
        transactionHistory={transactionHistory}
        totalTransactions={totalTransactions}
        historyPage={historyPage}
        setHistoryPage={setHistoryPage}
      />
    </S.Content>
  );
};

export default Product;
