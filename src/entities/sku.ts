export interface Sku {
  _id: string;
  rarity: string;
  name: string;
  description: string;
  maxSupply: number | string;
  redeemable: boolean;
  issuer: string; // Brand
  series: {
    name: string;
  };
  graphicUrl: string; // Default image
}
