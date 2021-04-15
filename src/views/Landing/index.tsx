import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// Local
import { useAppDispatch } from 'hooks/store';
import { getFeaturesThunk } from 'store/landing/landingThunks';
// Components
import Hero from './components/Hero';
import FeatureProducts from './components/Featured/FeatureProducts';
// import FeatureBoxes from './Featured/FeatureBoxes';
import LatestProducts from './components/LatestProducts';

const Landing = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    (async () => {
      dispatch(getFeaturesThunk(''));
      // dispatch(getDropBoxesThunk({ token: '' }));
    })();
  }, [dispatch]);

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
