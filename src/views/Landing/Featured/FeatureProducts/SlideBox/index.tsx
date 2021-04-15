import styled from 'styled-components/macro';
// Local
import Button from 'components/Buttons/Button';


// _id(pin):"606c6bbda383eb6ee67638f0"
// rarity(pin):"uncommon"
// display(pin):true
// featured(pin):true
// supplyType(pin):"variable"
// maxSupply(pin):200
// graphicUrl(pin):"http://example.com/u.png"
// name(pin):"M Jordan Limited"
// description(pin):"Est et sed et nostrum recusandae incidunt dicta."
// startDate(pin):"2021-03-15T00:00:00.000Z"
// endDate(pin):"2021-05-05T00:00:00.000Z"
// minStartDate(pin):null
// maxEndDate(pin):null
// minSkuPrice(pin):0
// minCurrentBid(pin):0
// circulatingSupply(pin):0
// totalSupplyLeft(pin):0
// totalSupplyUpcoming(pin):0
// maxBid(pin):0
// minPrice(pin):0

export interface IProps {
  product: any;
}

const SlideBox: React.FC<IProps> = ({ product }) => {
  return (
    <Container>
      <ImageContainer url="https://sneakernews.com/wp-content/uploads/2013/08/nike-lebron-11-beauty-shots-2.jpg" />

      <ProductDetails>
        <h5>MARKETPLACE FEATURE</h5>
        <div>SKU: {product._id} </div>

        <h2>{product.name}</h2>
        <h3>{product.description}</h3>
        <p>{product.maxSupply} listings for sale</p>
        <p style={{ marginBottom: '20px' }}>
          Listings from ${product.minSkuPrice} to ${product.minPrice}
        </p>

        <Button color="white">
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

interface ImageContainerProps {
  readonly url: string;
};

const ImageContainer = styled.div<ImageContainerProps>`
  height: 720px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url('${props => props.url}');
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

export default SlideBox;
