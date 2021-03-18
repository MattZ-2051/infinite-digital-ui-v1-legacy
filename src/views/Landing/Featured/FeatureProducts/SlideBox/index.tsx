import styled from 'styled-components/macro';
// Local
import Button from 'components/Button';
// Assets
import bg from 'assets/img/backgrounds/hero-bg3.jpeg';

export interface IProps {}

const Box: React.FC<IProps> = () => {
  return (
    <Container>
      <ImageContainer />

      <ProductDetails>
        <h5>MARKETPLACE FEATURE</h5>
        <div>SKU: 3319SE</div>

        <h2>ADIDAS Kaptir</h2>
        <h3>Super Fire (Black)</h3>
        <p>2 listings for sale</p>
        <p style={{ marginBottom: '20px' }}>Listings from $900 to $1,200</p>

        <Button type="button" color="white">
          Get yours now
        </Button>
      </ProductDetails>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  max-width: 1440px;
  padding: 0 50px 0 50px;
  display: flex;
  align-items: center;
  margin: auto;

  @media screen and (max-width: 1280px) {
    padding: 0 32px 0 32px;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
    height: auto;
    padding: 50px 32px 60px 32px;
  }
`;

const ProductDetails = styled.div`
  display: inline-grid;
  grid-gap: 12px;
  height: auto;
  font-weight: 600;
  min-width: 340px;

  @media screen and (max-width: 960px) {
    min-width: 280px;
    font-size: 0.85rem;
    grid-gap: 10px;
  }

  @media screen and (max-width: 600px) {
    font-size: 0.75rem;
  }

  p {
    margin: 0;
  }
`;

const ImageContainer = styled.div`
  height: 720px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${bg});
  width: calc(100% - 340px);
  background-size: contain;
  margin-right: 25px;

  @media screen and (max-width: 960px) {
    width: calc(100% - 280px);
    height: 540px;
  }

  @media screen and (max-width: 600px) {
    height: 250px;
    width: 100%;
    margin-bottom: 30px;
  }
`;

export default Box;
