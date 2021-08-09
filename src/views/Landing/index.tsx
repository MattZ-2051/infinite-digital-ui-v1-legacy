import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// Local
import {
  getUserInfoThunk,
  getUserCollectionThunk,
  getUserCardsThunk,
} from 'store/session/sessionThunks';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getFeaturesThunk } from 'store/landing/landingThunks';
// Components
import Hero from './components/Hero';
import FeaturedSlider from './components/FeaturedSlider';
// import FeatureBoxes from './Featured/FeatureBoxes';
import SkuTilesTab from './components/SkuTilesTab';
import Subscribe from './components/Subscribe';
import BuildWithUs from './components/BuildWithUs';
import VerifiedAuthenticity from './components/VerifiedAuthenticity';

const Landing = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loginWithRedirect, user, getAccessTokenSilently } =
    useAuth0();
  const loggedInUser = useAppSelector((state) => state.session.user);

  useEffect(() => {
    (async () => {
      dispatch(getFeaturesThunk({ token: '' }));
    })();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const userToken = await getAccessTokenSilently();
        dispatch(getUserInfoThunk({ token: userToken }));
        if (loggedInUser) {
          dispatch(
            getUserCollectionThunk({ token: '', id: loggedInUser['id'] })
          );
          dispatch(getUserInfoThunk({ token: userToken }));
          dispatch(getUserCardsThunk({ token: userToken }));
        }
      }
    };

    fetchData();
  }, [user]);
  return (
    <main>
      <Hero isAuthenticated={isAuthenticated} login={loginWithRedirect} />
      <FeaturedSlider />
      <SkuTilesTab />
      <BuildWithUs />
      <VerifiedAuthenticity />
      <Subscribe />
    </main>
  );
};

export default Landing;
