export type TPurchaseAndSales = {
  transaction: Transaction;
  _id: string;
  buyerId: string;
  items: TItem[];
  totalPrice: number;
  transactionStatus: string;
  status: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  shippingPhone: string;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface Transaction {
  id: string;
  transactionStatus: string;
  bank_status: string;
  date_time: string;
  method: string;
  sp_code: string;
  sp_message: string;
}

export type TItem = {
  itemId: string;
  sellerId: string;
  price: number;
  _id: string;
};
