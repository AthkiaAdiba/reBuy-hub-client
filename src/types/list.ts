export type TList = {
  _id: string;
  title: string;
  description: string;
  price: number;
  condition: string;
  images: string[];
  sellerId: string;
  status: string;
  category: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  sku?: string;
  tags?: string[];
  averageRating: number;
};

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};
