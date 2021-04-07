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
import { getUserInfoThunk } from 'store/session/sessionThunks';

const Landing = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  console.log(user)

  useEffect(() => {
    (async () => {
      dispatch(getListingsThunk({ token: '' }));
      dispatch(getDropBoxesThunk({ token: '' }));
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      if (user) {
        dispatch(getUserInfoThunk({ token: '', userId: user.sub }))
      }
    })();
  }, [user])
  return (
    <main>
      <Hero isAuthenticated={isAuthenticated} login={loginWithRedirect} />
      {/* Temporary comment to hide DropBoxes see issue #86
      <FeatureBoxes />
      */}
      <FeatureProducts />
      <LatestProducts />
    </main>
  );
};

export default Landing;
