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

const Product = ({}) => {
  const history = useHistory();
  const productId = history.location.pathname.split('/')[2];
  const [product, setProduct] = useState<ProductType | null>(null);
  const [transactionHistory, setTransactionHistory] = useState(null);

  async function fetchData() {
    const productRes = await getSingleProduct(productId);
    const historyRes = await getProductTransactionHistory(productId);

    setProduct(productRes.data);
    setTransactionHistory(historyRes.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log('product', product);
  if (product === null) {
    return <PageLoader />;
  }

  return (
    <S.Content>
      <ProductDetails product={product} />
      <History product={product} transactionHistory={transactionHistory} />
    </S.Content>
  );
};

export default Product;
