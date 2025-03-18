export interface IUser {
  userId: string;
  name: string;
  userEmail: string;
  hasShop?: boolean;
  address: string;
  phone: string;
  isDeleted?: boolean;
  status: string;
  image: string;
  role: "user" | "admin";
  iat?: number;
  exp?: number;
}

export type TFetchedUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  image: string;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
