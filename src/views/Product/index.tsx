import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import History from './History';
import {
  getSingleProduct,
  getProductTransactionHistory,
} from 'services/api/productService';
import { useHistory } from 'react-router-dom';
import { ProductWithFunctions as ProductType } from 'entities/product';
import ProductDetails from './ProductDetails';

const S: any = {};

const Product = ({}) => {
  const history = useHistory();
  const productId = history.location.pathname.split('/')[2];
  const [product, setProduct] = useState<ProductType>();
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

  return (
    <S.Container>
      <ProductDetails product={product} />
      <History product={product} transactionHistory={transactionHistory} />
    </S.Container>
  );
};

S.Container = styled.div`
  height: 100vh;
  background-color: #1a1a1a;
  color: white;
  display: grid;
  padding: 0 80px;
  grid-template-columns: 480px 1fr;
`;

export default Product;
