import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components/macro';
// Local
import {
  getUserInfoThunk,
  getUserCollectionThunk,
  getUserCardsThunk,
} from 'store/session/sessionThunks';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { updateLandingLoading } from 'store/landing/landingThunks';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// Components
import { FAQSection } from '../Landing/components/FAQSection/FAQSection';
import { Sku } from 'entities/sku';
import { getSkuTiles } from 'services/api/sku';
import AboutInfinite from './AboutInfinite';
import Intro from './Intro/intro';
import CollectSection from './CollectSection/collectSection';
import GreenSection from './GreenSection/greenSection';
import FeaturedOn from './FeaturedOn/featuredOn';
import VipModal from './VipModal';
import PageLoader from 'components/PageLoader';

const Vip = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loginWithRedirect, user, getAccessTokenSilently } =
    useAuth0();
  const loggedInUser = useAppSelector((state) => state.session.user);
  const landingLoading = useAppSelector((state) => state.landing.loading);
  const matchesMobile = useMediaQuery('(max-width:960px)', { noSsr: true });
  const [tiles, setTiles] = useState<Sku[] | []>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // This call was for featured slider, removing for now since comp was removed

  // useEffect(() => {
  //   (async () => {
  //     dispatch(getFeaturesThunk({ token: '' }));
  //   })();
  // }, []);

  // List only different users
  const filteredByUser = (tiles: Sku[]) => {
    const filteredTiles: Sku[] = [];
    const selectedIssuers: string[] = [];
    for (const tile of tiles) {
      if (matchesMobile && filteredTiles.length === 3) break;
      if (filteredTiles.length === 4) break;
      if (!selectedIssuers.includes(tile.issuerName)) {
        selectedIssuers.push(tile.issuerName);
        filteredTiles.push(tile);
      }
    }
    return filteredTiles;
  };

  async function fetchProducts() {
    const skuTiles = await getSkuTiles();
    if (skuTiles.data) {
      setTiles(filteredByUser(skuTiles.data));
      dispatch(updateLandingLoading('false'));
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      setIsModalOpen(true);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    dispatch(updateLandingLoading('idle'));
  }, []);
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const userToken = await getAccessTokenSilently();
        dispatch(getUserInfoThunk({ token: userToken }));
        if (user) {
          dispatch(
            getUserCollectionThunk({ token: '', id: loggedInUser['id'] })
          );
          dispatch(getUserCardsThunk({ token: userToken }));
        }
      }
    };

    fetchData();
  }, [user]);

  if (!tiles || landingLoading === 'idle') return <PageLoader size={40} />;
  return (
    <main>
      <Intro authenticated={isAuthenticated} login={loginWithRedirect} />
      <CollectSection />
      <AboutInfinite />
      <GreenSection />
      <FeaturedOn />
      <FAQSection />
      <VipModal setIsVisible={setIsModalOpen} visible={isModalOpen} />
    </main>
  );
};

export default Vip;
