import React, { useState, useEffect } from 'react';
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

const Collectors = () => {
  const { isAuthenticated } = useAuth0();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const { skuid } = useParams<{ skuid: string }>();
  const [sku, setSku] = useState<Sku>();
  const loggedInUser = useAppSelector((state) => state.session.user);

  console.log('sku', sku);
  useEffect(() => {
    fetchSku().then((sku) => {
      if (sku?.productListings?.[0]) {
        fetchProduct(sku.productListings[0]._id);
      }
    });
    fetchCollectors();
  }, [skuid]);

  async function fetchProduct(prodId: string) {
    const productRes = await getSingleProduct(prodId);
    setProduct(productRes.data);
  }

  async function fetchCollectors() {
    const collectors = await getProductCollectors(skuid);
    setCollectors(collectors);
  }

  async function fetchSku() {
    const sku = await getSku<true>(skuid, {
      includeFunctions: true,
    });
    setSku(sku);
    return sku;
  }

  let redeemable = false;
  if (isAuthenticated) {
    if (
      loggedInUser.id === product?.owner.id &&
      product?.sku.redeemable === true
    ) {
      redeemable = true;
    }
  }

  if (!sku) return <PageLoader />;

  return (
    <S.MainContent>
      <ProductDetails
        sku={sku}
        totalSupply={sku.totalSupply || 0}
        circulatingSupply={sku?.circulatingSupply || 0}
        redeemable={redeemable}
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
            / #{product?.serialNumber}
          </div>
        </S.Title>
        <S.SectionTitle style={{ marginTop: 20 }}>Collectors</S.SectionTitle>

        <CollectorList
          hasProducts={collectors.length !== 0}
          collectors={collectors}
          redeemable={redeemable as boolean}
        />
      </S.Container>
    </S.MainContent>
  );
};

export default Collectors;
