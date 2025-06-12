import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TList } from "@/types/list";

interface CartItem extends TList {
  productTotalQuantity: number;
  productTotalPrice: number;
}

interface InitialState {
  products: CartItem[];
  phone: string;
  address: string;
  subTotal: number;
  totalQuantity: number;
}

const initialState: InitialState = {
  products: [],
  phone: "",
  address: "",
  subTotal: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (!existingProduct) {
        const quantity = 1;
        const price = action.payload.offerPrice
          ? action.payload.price - action.payload.offerPrice
          : action.payload.price;

        const productTotalPrice = price * quantity;

        state.products.push({
          ...action.payload,
          productTotalQuantity: quantity,
          productTotalPrice,
        });

        state.subTotal += productTotalPrice;
        state.totalQuantity += quantity;
      }
    },

    removeProduct: (state, action: PayloadAction<string>) => {
      const productToRemove = state.products.find(
        (product) => product._id === action.payload
      );

      if (productToRemove) {
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );

        state.subTotal -= productToRemove.productTotalPrice;
        state.totalQuantity -= productToRemove.productTotalQuantity;
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.products.find((p) => p._id === id);

      if (product) {
        const oldQuantity = product.productTotalQuantity;
        const oldTotalPrice = product.productTotalPrice;

        const price = product.offerPrice
          ? product.price - product.offerPrice
          : product.price;

        const newTotalPrice = price * quantity;

        product.productTotalQuantity = quantity;
        product.productTotalPrice = newTotalPrice;

        state.subTotal += newTotalPrice - oldTotalPrice;
        state.totalQuantity += quantity - oldQuantity;
      }
    },

    updatePhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },

    updateAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },

    clearCart: (state) => {
      state.products = [];
      state.phone = "";
      state.address = "";
      state.subTotal = 0;
      state.totalQuantity = 0;
    },
  },
});

// -------------------- Selectors --------------------

export const orderedProductsSelector = (state: RootState) =>
  state.cart.products;

export const subTotalSelector = (state: RootState) => state.cart.subTotal;

export const totalQuantitySelector = (state: RootState) =>
  state.cart.totalQuantity;

export const addressSelector = (state: RootState) => state.cart.address;

export const phoneSelector = (state: RootState) => state.cart.phone;

export const orderSelector = (state: RootState) => ({
  items: state.cart.products.map((product) => ({
    itemId: product._id,
    sellerId: product.sellerId,
    quantity: product.productTotalQuantity,
  })),
  phone: state.cart.phone,
  address: state.cart.address,
});

// -------------------- Exports --------------------

export const {
  addProduct,
  removeProduct,
  updateQuantity,
  updatePhone,
  updateAddress,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
