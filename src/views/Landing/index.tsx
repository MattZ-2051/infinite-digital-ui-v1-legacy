import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// Local
import { useAppDispatch } from 'hooks/store';
import { getListingsThunk } from 'store/listing/listingThunks';
// Components
import Hero from './Hero';
import FeatureProducts from './Featured/FeatureProducts';
import FeatureBoxes from './Featured/FeatureBoxes';
import LatestProducts from './LatestProducts';
import { getDropBoxesThunk } from 'store/dropBox/dropBoxThunks';

const Landing = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    (async () => {
      dispatch(getListingsThunk({ token: '' }));
      dispatch(getDropBoxesThunk({ token: '' }));
    })();
  }, [dispatch]);

  return (
    <main>
      <Hero isAuthenticated={isAuthenticated} login={loginWithRedirect} />
      {/* Temporary comment see issue #86 for more details
      <FeatureBoxes />
      */}
      <FeatureProducts />
      <LatestProducts isAuthenticated={isAuthenticated} />
    </main>
  );
};

export default Landing;
