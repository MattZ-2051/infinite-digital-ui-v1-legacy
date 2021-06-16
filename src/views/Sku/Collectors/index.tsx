import React, { useState, useEffect, useCallback } from 'react';
import { getProductCollectors } from 'services/api/productService';
import { Collector } from 'entities/collector';
import { useParams, useHistory } from 'react-router-dom';
import { Sku } from 'entities/sku';
import { getSku } from 'services/api/sku';
import PageLoader from 'components/PageLoader';
import * as S from './styles';
import ProductDetails from '../../Product/ProductDetails';
import { getSingleProduct } from 'services/api/productService';
import { ProductWithFunctions as ProductType } from 'entities/product';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppSelector } from 'store/hooks';
import CollectorList from './collectorList';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const PER_PAGE = 5;
const CURRENT_PAGE = 1;

const Collectors = () => {
  const { isAuthenticated } = useAuth0();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [collectors, setCollectors] = useState<{
    data: Collector[];
    total: number;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { skuid } = useParams<{ skuid: string }>();
  const [sku, setSku] = useState<Sku>();
  const loggedInUser = useAppSelector((state) => state.session.user);

  const matchesMobile = useMediaQuery('(max-width:1140px)');
  const [valueCurrentPage, setCurrentPage] = useState<number>(CURRENT_PAGE);

  const changePageCallback = useCallback(
    (ev, page) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  useEffect(() => {
    fetchSku();
    //.then((sku) => {
    // if (sku?.productListings?.[0]) {
    //   fetchProduct(sku.productListings[0]._id);
    // }
    //});
    fetchCollectors(valueCurrentPage);
  }, [skuid, valueCurrentPage]);

  async function fetchProduct(prodId: string) {
    const productRes = await getSingleProduct(prodId);
    setProduct(productRes.data);
  }

  async function fetchCollectors(page: number) {
    try {
      const collectors = await getProductCollectors(skuid, page, PER_PAGE);
      setCollectors(collectors);
    } catch (err) {}
  }

  async function fetchSku() {
    const sku = await getSku<true>(skuid, {
      includeFunctions: true,
    });
    setSku(sku);
    // return sku;
  }

  // let redeemable = false;
  // if (isAuthenticated) {
  //   if (
  //     loggedInUser.id === product?.owner.id &&
  //     product?.sku.redeemable === true
  //   ) {
  //     redeemable = true;
  //   }
  // }

  if (loading || !sku) return <PageLoader />;

  return (
    <S.MainContent>
      <ProductDetails
        sku={sku}
        totalSupply={sku.totalSupply || 0}
        circulatingSupply={sku?.circulatingSupply || 0}
        redeemable={sku?.redeemable}
      />
      <S.Container>
        <S.Title>
          <div>
            <S.TitleLink to="/marketplace?page=1&per_page=6&sortBy=startDate:asc">
              Marketplace
            </S.TitleLink>{' '}
            /{' '}
            <S.TitleLink to={`/marketplace/${sku?._id}`}>
              {sku?.name}
            </S.TitleLink>{' '}
            / Collectors
          </div>
        </S.Title>
        <S.SectionTitle style={{ marginTop: 20 }}>Collectors</S.SectionTitle>

        {collectors && (
          <S.ContentListPagination>
            <CollectorList
              hasProducts={collectors.data.length !== 0}
              collectors={collectors.data}
              redeemable={sku?.redeemable}
            />
            <S.PaginationContainer>
              <S.CustomPagination
                count={Math.ceil(collectors?.total / PER_PAGE)}
                page={valueCurrentPage}
                onChange={changePageCallback}
                siblingCount={matchesMobile ? 0 : 1}
                style={{ color: 'white' }}
              />
            </S.PaginationContainer>
          </S.ContentListPagination>
        )}
      </S.Container>
    </S.MainContent>
  );
};

export default Collectors;
