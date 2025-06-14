export type TUserOverview = {
  totalContents: number;
  totalTransactions: number;
  totalEarnings: number;
  sellerItems: SellerItem[];
};

export interface SellerItem {
  itemId: string;
  sellerId: string;
  price: number;
  quantity: number;
  _id: string;
  transactionCreatedAt: string;
  transactionUpdatedAt: string;
  transactionId: string;
  buyerId: string;
  status: string;
}
