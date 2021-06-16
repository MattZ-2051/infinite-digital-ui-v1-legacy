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
import SearchBar from 'components/SearchBar';
import { cancelablePromise } from 'utils/cancelablePromise';

const PER_PAGE = 5;
const CURRENT_PAGE = 1;

const Collectors = () => {
  const { isAuthenticated } = useAuth0();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { skuid } = useParams<{ skuid: string }>();
  const [sku, setSku] = useState<Sku>();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [forSaleCheck, setForSaleCheck] = useState<boolean>(false);
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
    fetchCollectors();
  }, [skuid]);

  async function fetchProduct(prodId: string) {
    const productRes = await getSingleProduct(prodId);
    setProduct(productRes.data);
  }

  async function fetchCollectors() {
    try {
      setLoading(true);
      const collectors = await getProductCollectors(
        skuid,
        valueCurrentPage,
        PER_PAGE
      );
      setCollectors(collectors);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
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

  useEffect(() => {
    setLoading(true);
    const cPr = cancelablePromise(
      getProductCollectors(
        skuid,
        valueCurrentPage,
        PER_PAGE,
        searchTerm,
        forSaleCheck
      )
    );
    cPr.promise
      .then((collectors) => {
        setCollectors(collectors as Collector[]);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });

    return () => cPr.cancel();
  }, [searchTerm]);

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
        <S.SectionTitle>Collectors</S.SectionTitle>
        <SearchBar
          onSearch={setSearchTerm}
          onChecked={setForSaleCheck}
          placeholder={'*Select an owner to place a bid'}
        />

        <S.ContentListPagination>
          <CollectorList
            hasProducts={collectors.length !== 0}
            collectors={collectors}
            redeemable={sku?.redeemable}
          />
          <S.PaginationContainer>
            <S.CustomPagination
              count={Math.ceil(5 / PER_PAGE)}
              page={valueCurrentPage}
              onChange={changePageCallback}
              siblingCount={matchesMobile ? 0 : 1}
              style={{ color: 'white' }}
            />
          </S.PaginationContainer>
        </S.ContentListPagination>
      </S.Container>
    </S.MainContent>
  );
};

export default Collectors;
