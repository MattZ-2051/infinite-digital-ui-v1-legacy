import React from 'react';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// Local
import {
  getUserInfoThunk,
  getUserCollectionThunk,
  getUserCardsThunk,
} from 'store/session/sessionThunks';
import { useAppDispatch, useAppSelector } from 'hooks/store';
import { getFeaturesThunk } from 'store/landing/landingThunks';
// Components
import Hero from './components/Hero';
import FeatureProducts from './components/Featured/FeatureProducts';
// import FeatureBoxes from './Featured/FeatureBoxes';
import LatestProducts from './components/LatestProducts';

const Landing = () => {
  const dispatch = useAppDispatch();
  const {
    isAuthenticated,
    loginWithRedirect,
    user,
    getAccessTokenSilently,
  } = useAuth0();
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
            getUserCollectionThunk({ token: '', userId: loggedInUser['id'] })
          );
          dispatch(getUserCardsThunk({ token: userToken }));
        }
      }
    };

    fetchData();
  }, [user]);
  return (
    <main>
      <Hero isAuthenticated={isAuthenticated} login={loginWithRedirect} />
      {/* Temporary comment to hide DropBoxes see issue #86
      <FeatureBoxes />
      */}
      <FeatureProducts />
      <LatestProducts isAuthenticated={isAuthenticated} />
    </main>
  );
};

export default Landing;
