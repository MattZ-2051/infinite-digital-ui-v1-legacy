import Hero from './Hero';
import FeatureProducts from './Featured/FeatureProducts';
import FeatureBoxes from './Featured/FeatureBoxes';
import LatestProducts from './LatestProducts';

export interface IProps {}

const Landing: React.FC<IProps> = () => {
  return (
    <main>
      <Hero />
      <FeatureBoxes />
      <FeatureProducts />
      <LatestProducts />
    </main>
  );
};

export default Landing;
