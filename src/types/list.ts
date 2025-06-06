import { TFetchedCategory } from "./category";

export type TList = {
  _id: string;
  title: string;
  description: string;
  price: number;
  offerPrice: number;
  condition: string;
  images: string[];
  sellerId: string;
  status: string;
  category: TFetchedCategory;
  location: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  sku?: string;
  tags?: string[];
  averageRating: number;
  quantity: number;
};

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};
