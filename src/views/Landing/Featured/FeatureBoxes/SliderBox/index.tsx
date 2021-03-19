import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
// Local
import Button from 'components/Button';
// Assets
import bg from 'assets/img/backgrounds/hero-bg2.jpeg';

export interface IProps {}

const SlideBox: React.FC<IProps> = () => {
  return (
    <Container>
      <ProductDetails>
        <h5>FEATURED INFINITE</h5>
        <h2>Gold DROP BOX</h2>
        <h3>Infinite Launch Series 1</h3>

        <p style={{ fontSize: '18px' }}>
          Only <span style={{ fontSize: '35px', fontWeight: 'bold' }}>7</span>{' '}
          left
        </p>

        <p style={{ fontSize: '24px' }}>
          Price{' '}
          <span style={{ fontSize: '45px', fontWeight: 'bold' }}>$50</span>
        </p>

        <Button type="button" color="black">
          Get yours now
        </Button>

        <p style={{ marginTop: '10px' }}>
          Each box contains 3 products. <br />
          <Link to="/">Click Here</Link> to learn more.
        </p>
      </ProductDetails>
      <ImageContainer />
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
    flex-direction: column-reverse;
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
  margin-left: 25px;

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

export default SlideBox;
