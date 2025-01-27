import { useEffect, useState } from 'react';
import * as S from './styles';
import History from './History';
import {
  getSingleProduct,
  getProductTransactionHistory,
} from 'services/api/productService';
import { useParams } from 'react-router-dom';
import { ProductWithFunctions as ProductType } from 'entities/product';
import ProductDetails from './ProductDetails';
import PageLoader from 'components/PageLoader';
import { ITransaction } from 'entities/transaction';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import {
  getUserInfoThunk,
  getUserCardsThunk,
} from 'store/session/sessionThunks';
const Product = ({}) => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const { productId } = useParams<{ productId: string }>();
  const [transactionHistory, setTransactionHistory] = useState<
    ITransaction[] | null
  >(null);
  const [totalTransactions, setTotalTransactions] = useState<number>(1);
  const [historyPage, setHistoryPage] = useState<number>(1);
  const perPage = 5;
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const dispatch = useAppDispatch();

  const loggedInUser = useAppSelector((state) => state.session.user);

  async function fetchData() {
    const productRes = await getSingleProduct(productId);
    const transactionRes = await getProductTransactionHistory(
      productId,
      historyPage,
      perPage
    );

    setProduct(productRes);
    setTransactionHistory(transactionRes.data);
    setTotalTransactions(transactionRes.totalTransactions);
  }

  async function updateUserBalance() {
    if (isAuthenticated) {
      dispatch(getUserInfoThunk({ token: await getAccessTokenSilently() }));
      dispatch(getUserCardsThunk({ token: await getAccessTokenSilently() }));
    }
  }

  useEffect(() => {
    updateUserBalance();
  }, [isAuthenticated]);

  useEffect(() => {
    fetchData();
  }, [historyPage]);

  if (!product || !transactionHistory) {
    return <PageLoader />;
  }
  let redeemable = false;
  if (isAuthenticated) {
    if (
      loggedInUser.id === product.owner.id &&
      product.sku.redeemable === true
    ) {
      redeemable = true;
    }
  }
  return (
    <div style={{ background: '#1a1a1a' }}>
      <S.Content>
        <ProductDetails
          sku={product.sku}
          totalSupply={product.totalSupply}
          circulatingSupply={product.circulatingSupply || 0}
          redeemable={redeemable}
          skuTokenId={product.tokenId}
          explorerLink={product?.explorerLink}
          serialNumber={product.serialNumber}
        />
        <History
          product={product}
          transactionHistory={transactionHistory}
          totalTransactions={totalTransactions}
          historyPage={historyPage}
          setHistoryPage={setHistoryPage}
        />
      </S.Content>
    </div>
  );
};

export default Product;
