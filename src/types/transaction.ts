/* eslint-disable @typescript-eslint/no-explicit-any */
export type TFetchedTransaction = {
  transaction: Transaction;
  _id: string;
  buyerId: string;
  items: Item[];
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
  transactionStatus: any;
  bank_status: string;
  date_time: string;
  method: string;
  sp_code: string;
  sp_message: string;
}

export interface Item {
  itemId: string;
  sellerId: string;
  quantity: number;
  _id: string;
}
