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
