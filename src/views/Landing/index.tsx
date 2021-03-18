import { useAuth0 } from '@auth0/auth0-react';
// Local
import Hero from './Hero';
import FeatureProducts from './FeatureProducts';
import FeatureBoxes from './FeatureBoxes';
import LatestProducts from './LatestProducts';

export interface IProps {}

const Landing: React.FC<IProps> = () => {

  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  return (
    <main>
      <Hero isAuthenticated={isAuthenticated} login={loginWithRedirect} />
      <FeatureBoxes />
      <FeatureProducts />
      <LatestProducts />
    </main>
  );
};

export default Landing;
