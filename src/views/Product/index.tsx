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
    fetchData();
  }, []);

  if (!product || !transactionHistory) {
    return <PageLoader />;
  }

  console.log('history', transactionHistory);
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
