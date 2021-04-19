import SkuTile from "components/ProductTiles/SkuTile";
import ProductTile from "../../../MarketPlace/components/ProductTile";
import styled from "styled-components/macro";
import { useAppSelector } from "hooks/store";
import { type } from "node:os";

const MyItems = () => {
  const mockItems = useAppSelector(
    (state) => state.session.userCollection.collectors
  );

  console.log(mockItems);

  return (
    <MyItemsContainer>
      <TileContainer style={{ paddingRight: "10px", paddingLeft: "0" }}>
        {/* {mockItems.map((item) => {
          let type: string = 'active-listing';
          if (item.listing.status !== 'active') {
            type = "no-active-listing"
          } else {
            type = "active-listing"
          }

          return (
            <ProductTile
              redeemable={true}

          )
        })} */}
        <ProductTile
          redeemable={true}
          name="Product Name"
          img={""}
          status={"active-listing"}
          series={"series"}
          rarity="epic"
          productSerialNumber={1234}
          issuer="adidas"
          purchasedDate="1k"
        />
      </TileContainer>
      <TileContainer style={{ paddingRight: "10px", paddingLeft: "0" }}>
        <ProductTile
          redeemable={true}
          name="Product Name"
          img={""}
          status={"active-listing"}
          series={"series"}
          rarity="epic"
          productSerialNumber={1234}
          issuer="adidas"
          purchasedDate="1k"
        />
      </TileContainer>
      <TileContainer style={{ paddingRight: "10px", paddingLeft: "0" }}>
        <ProductTile
          redeemable={true}
          name="Product Name"
          img={""}
          status={"active-listing"}
          series={"series"}
          rarity="epic"
          productSerialNumber={1234}
          issuer="adidas"
          purchasedDate="1k"
        />
      </TileContainer>
      <TileContainer style={{ paddingRight: "10px", paddingLeft: "0" }}>
        <ProductTile
          redeemable={true}
          name="Product Name"
          img={""}
          status={"no-active-listing"}
          series={"series"}
          rarity="epic"
          productSerialNumber={1234}
          issuer="adidas"
          purchasedDate="200"
        />
      </TileContainer>
    </MyItemsContainer>
  );
};

const TileContainer = styled.div`
  padding: 0 10px;
`;

const MyItemsContainer = styled.div`
  display: flex;
  overflow: auto;
`;

export default MyItems;
