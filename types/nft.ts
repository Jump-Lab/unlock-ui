export interface INFT {
  name: string;
  symbol: string;
  description: string;
  seller_fee_basis_points: number;
  image: string;
  external_url: string;
  edition: number;
  attributes: Record<string, string>[];
  collection: Record<string, string>;
  properties: Record<string, any>;
}
