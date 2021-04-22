import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useAppSelector } from 'hooks/store';
import ProductTile from '../../../MarketPlace/components/ProductTile';
import { getUserCollection } from 'services/api/userService';

const MyItems = () => {
  const mockItems = useAppSelector(
    (state) => state.session.userCollection.collectors
  );
  const history = useHistory();
  const id = history.location.pathname.split('/')[2];
  const [userItems, setUserItems] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      //TODO change enpoint this is a mock server endpoint
      const res = await getUserCollection('', id);
      if (res) {
        setUserItems(res.data.collectors);
      }
    }

    fetchData();
  }, [id]);

  return (
    // {
    //   _id: "605a27bd5eb3c136ab82a1aa",
    //   redeemedStatus: "NA",
    //   serialNumber: 11,
    //   tokenId: "0.0.458103",
    //   owner: {
    //     _id: "605a27a95eb3c136ab82a1a1",
    //     balance: 0,
    //     role: "user",
    //     hederaAccount: "0.0.458279",
    //     email: "Bryce373@hotmail.com",
    //     username: "@modesto423",
    //     externalId: "443ae823-74cc-4bef-919d-c4557f4cd93d",
    //     profilePhotoUrl: "http://example.com/2.png",
    //     createdAt: "2021-03-23T18:54:49.131Z",
    //     updatedAt: "2021-03-23T18:54:49.131Z",
    //     __v: 0,
    //   },
    //   sku: {
    //     _id: "606c6bbda383eb6ee67638f0",
    //     rarity: "uncommon",
    //     redeemable: false,
    //     display: true,
    //     featured: true,
    //     imageUrls: ["http://example.com/1.png", "http://example.com/2.png"],
    //     supplyType: "variable",
    //     maxSupply: 200,
    //     graphicUrl: "http://example.com/u.png",
    //     name: "M Jordan Limited",
    //     description: "Est et sed et nostrum recusandae incidunt dicta.",
    //     startDate: "2021-03-15T00:00:00.000Z",
    //     endDate: "2021-05-05T00:00:00.000Z",
    //     series: {
    //       _id: "606c6bbaa383eb6ee67638ee",
    //       name: "Miscelaneous",
    //       description: "Other items",
    //       issuerId: "6048e601782c593a7c6dffc0",
    //       createdAt: "2021-04-06T14:10:02.388Z",
    //       updatedAt: "2021-04-06T14:10:02.788Z",
    //       __v: 0,
    //       id: "606c6bbaa383eb6ee67638ee",
    //     },
    //   },
    //   createdAt: "2021-03-23T17:39:09.082Z",
    //   updatedAt: "2021-03-23T17:39:09.082Z",
    //   __v: 0,
    //   listing: {
    //     _id: "6067630bab5ba5c1ac533957",
    //     canceled: false,
    //     type: "product",
    //     issuer: "6048e601782c593a7c6dffc0",
    //     sku: {
    //       _id: "606c6bbda383eb6ee67638f0",
    //       rarity: "uncommon",
    //       redeemable: false,
    //       display: true,
    //       featured: true,
    //       imageUrls: ["http://example.com/1.png", "http://example.com/2.png"],
    //       supplyType: "variable",
    //       maxSupply: 200,
    //       graphicUrl: "http://example.com/u.png",
    //       name: "M Jordan Limited",
    //       description: "Est et sed et nostrum recusandae incidunt dicta.",
    //       startDate: "2021-03-15T00:00:00.000Z",
    //       endDate: "2021-05-05T00:00:00.000Z",
    //       series: {
    //         _id: "606c6bbaa383eb6ee67638ee",
    //         name: "Miscelaneous",
    //         description: "Other items",
    //         issuerId: "6048e601782c593a7c6dffc0",
    //         createdAt: "2021-04-06T14:10:02.388Z",
    //         updatedAt: "2021-04-06T14:10:02.788Z",
    //         __v: 0,
    //         id: "606c6bbaa383eb6ee67638ee",
    //       },
    //     },
    //     price: 10,
    //     saleType: "fixed",
    //     supply: 12,
    //     startDate: "2021-02-22T00:00:00.000Z",
    //     endDate: "2021-02-22T00:00:00.000Z",
    //     createdAt: "2021-04-02T18:31:39.072Z",
    //     updatedAt: "2021-04-02T18:31:39.072Z",
    //     __v: 0,
    //     minBid: 450,
    //     status: "active",
    //     highestBid: {
    //       _id: "6070c90e10c01a05b9d29b0b",
    //       listing: "6067630bab5ba5c1ac533957",
    //       owner: "6048e601782c593a7c6dffc0",
    //       bidAmt: 33,
    //       status: "active",
    //     },
    //   },
    // },
    <MyItemsContainer>
      {userItems instanceof Array &&
        userItems.map((item, index) => {
          let type: string = 'active-listing';
          let sku = item.sku;
          if (item.listing.status === 'active') {
            type = 'active-listing';
          } else {
            type = 'no-active-listing';
          }

          return (
            <TileContainer
              style={{ paddingLeft: `${index === 0 ? '0px' : '10px'}` }}
            >
              <ProductTile
                redeemable={true}
                status={type}
                name={sku.name}
                img={sku.graphicUrl}
                rarity={sku.rarity}
                series={sku.series.name}
                productSerialNumber={item.serialNumber}
                issuer={'adidas'}
                key={item.id}
                purchasedDate="1k"
              />
            </TileContainer>
          );
        })}
    </MyItemsContainer>
  );
};

const TileContainer = styled.div`
  padding: 0 20px;
`;

const MyItemsContainer = styled.div`
  display: flex;
  overflow: auto;
  width: 100%;
`;

export default MyItems;
