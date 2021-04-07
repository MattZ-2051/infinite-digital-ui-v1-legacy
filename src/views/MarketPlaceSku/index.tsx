import { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';
import { ReactComponent as RedeemableIcon } from 'assets/svg/icons/redeemable.svg';
// Local
import ImageGallery from 'components/ImageGallery';
import { getSku } from 'services/api/sku';

export interface SkuDetailProps {}

// {
//   "rarity": "uncommon",
//   "redeemable": false,
//   "display": true,
//   "featured": true,
//   "imageUrls": [
//     "http://example.com/1.png",
//     "http://example.com/2.png"
//   ],
//   "supplyType": "variable",
//   "maxSupply": 200,
//   "_id": "606c6bbda383eb6ee67638f0",
//   "graphicUrl": "http://example.com/u.png",
//   "name": "M Jordan Limited",
//   "description": "Est et sed et nostrum recusandae incidunt dicta.",
//   "startDate": "2021-03-15T00:00:00.000Z",
//   "endDate": "2021-05-05T00:00:00.000Z",
//   "series": {
//     "_id": "606c6bbaa383eb6ee67638ee",
//     "name": "Miscelaneous",
//     "description": "Other items",
//     "issuerId": "6048e601782c593a7c6dffc0",
//     "createdAt": "2021-04-06T14:10:02.388Z",
//     "updatedAt": "2021-04-06T14:10:02.788Z",
//     "__v": 0,
//     "id": "606c6bbaa383eb6ee67638ee"
//   },
//   "category": "606c6bbaa383eb6ee67638ef",
//   "issuer": "6048e601782c593a7c6dffc0",
//   "createdAt": "2021-04-06T14:10:05.817Z",
//   "updatedAt": "2021-04-06T14:10:09.256Z",
//   "__v": 0,
//   "products": [],
//   "id": "606c6bbda383eb6ee67638f0"
// }

interface ISku {
  id: string;
  rarity: string;
  name: string;
  description: string;
  maxSupply: number | string;
  redeemable: boolean;
  issuer: string; // Brand
  series: {
    name: string,
  };
  graphicUrl: string; // Default image
}

const SkuDetail: React.FC<SkuDetailProps> = () => {
  let { skuid } = useParams<{ skuid: string }>();
  const [skuDetails, setSkuDetails] = useState<ISku>();

  useEffect(() => {
    const skuData = getSku(skuid).then((res) => {
      setSkuDetails(res.data);
    });
  }, []);

  return (
    <div>
      <HeaderContainer>
        <HeaderContent>
          <HeaderLeft>
            <ImageGallery />
          </HeaderLeft>
          <HeaderRight>
            <ProductDetail>
              <Breadcrumbs>
                <a href="/marketplace" style={{ color: 'white' }}>
                  Marketplace
                </a>{' '}
                / <span style={{ color: '#7C7C7C' }}>{skuDetails?.name}</span>
              </Breadcrumbs>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  fontSize: '24px',
                }}
              >
                <Brand>Nike</Brand>
                <Rarity>
                  <span></span>
                  {skuDetails?.rarity}
                </Rarity>
              </div>

              <SkuTitle>{skuDetails?.name}</SkuTitle>

              <p
                style={{
                  fontSize: '18px',
                }}
              >
                # {skuDetails?.series?.name}
              </p>

              <p>SKU: {skuDetails?.id} / 50 to be released</p>

              <LineDivider />

              {skuDetails?.redeemable && (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                  <RedeemableIcon /> &nbsp; Redeemable
                </div>
              )}
              
            </ProductDetail>

            <UpcomingBox>
              <span style={{ fontSize: '24px', color: '#8E8E8E' }}>
                Upcoming in:
              </span>
              <span style={{ fontSize: '24px' }}>05h 20m</span>
            </UpcomingBox>
          </HeaderRight>
        </HeaderContent>
      </HeaderContainer>

      <Section
        style={{ paddingTop: '55px', flexDirection: 'row', color: '#9E9E9E' }}
      >
        <Description>
          <SectionTitle>Description</SectionTitle>

          {skuDetails?.description}
          {/* <p>The Perception Shoe is now a Reality.</p>
          <p>
            This groundbreaking Basketball Shoe disrupts what used to be the
            expected. This true on-court performance shoe, which is equally as
            comfortable off-court, was designed by Spencer Dinwiddie.
          </p>
          <SectionSubTitle>Upper:</SectionSubTitle>
          <p>
            Our light-weight Engineered Mesh was developed to support getting
            the job done. A mid-foot external support strap, along with a tongue
            that transitions into an internal fit sleeve provides the comfort
            and support for the job at-hand.
          </p>
          <SectionSubTitle>Cushioning:</SectionSubTitle>
          <p>
            Full length (heel to toe) KronoFoam provides incredible
            responsiveness while being ridiculously light. The external lateral
            heel TPU midsole frame lends additional stability while enhancing
            the benefits of KronoFoam.
          </p> */}
        </Description>

        <Listing>
          <SectionTitle>Auction Listing</SectionTitle>

          <p style={{ textAlign: 'center' }}>Initial release upcoming</p>
        </Listing>
      </Section>

      <Section>
        <SectionTitle>Related Releases</SectionTitle>

        <TilesContainer>
          <Tile /> <Tile /> <Tile /> <Tile />
        </TilesContainer>
      </Section>
    </div>
  );
};

const HeaderContainer = styled.div`
  background-color: #1a1a1a;
`;

const HeaderContent = styled.div`
  max-width: 1440px;
  margin: auto;
  display: flex;
  flex-direction: row;
  height: 700px;
  color: white;
  justify-content: space-between;
  //border: 1px solid red;
`;

const HeaderLeft = styled.div`
  width: 54%;
  padding: 0 0 0 80px;
`;

const HeaderRight = styled.div`
  width: 46%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  padding: 48px 80px 48px 48px;
`;

const Description = styled.div`
  width: 54%;
`;

const Listing = styled.div`
  width: 46%;
  max-width: 713px;
  margin-left: 64px;
`;

const SkuTitle = styled.div`
  font-size: 48px;
`;

const Brand = styled.h3`
  font-size: 24px;
  color: #8e8e8e;
  margin-bottom: 16px;
`;

const UpcomingBox = styled.div`
  padding: 0 80px 0 48px;
  height: 147px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: black;
`;

const Tile = styled.div`
  width: 305px;
  height: 515px;
  background-color: #ddd8db;
  border-radius: 20px;
  margin-right: 15px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  padding: 0 80px 48px 80px;
  //border: 1px solid green;
  margin: auto;
  font-size: 16px;
`;

const SectionTitle = styled.h2`
  font-weight: 600 !important;
  font-size: 24px;
  border-bottom: 1px solid #ebebeb;
  margin-bottom: 40px;
  font-weight: 500px;
  color: black;
`;

const SectionSubTitle = styled.h3`
  font-weight: 600 !important;
  font-size: 18px;
  color: black;
`;

const TilesContainer = styled.div`
  display: flex;
`;

const Breadcrumbs = styled.div`
  margin-bottom: 60px;
  a {
    text-decoration: none;
    color: grey;
  }
`;

const Rarity = styled.div`
  display: flex;
  align-items: center;
  color: #2ddebf;

  span {
    border-radius: 50%;
    background-color: #2ddebf;
    height: 20px;
    width: 20px;
    display: inline-block;
    margin-right: 8px;
  }
`;

const LineDivider = styled.div`
  height: 1px;
  background-color: #464646;
  width: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export default SkuDetail;
