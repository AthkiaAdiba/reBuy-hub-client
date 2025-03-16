import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TList } from "@/types/list";
// import storage from "redux-persist/lib/storage";

interface InitialState {
  products: TList[];
  phone: string;
  address: string;
  subTotal: number;
}

const initialState: InitialState = {
  products: [],
  phone: "",
  address: "",
  subTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const productExists = state.products.some(
        (product) => product._id === action.payload._id
      );

      if (!productExists) {
        state.products.push(action.payload);
        state.subTotal += action.payload.price;
      }
    },

    removeProduct: (state, action) => {
      const productToRemove = state.products.find(
        (product) => product._id === action.payload
      );

      if (productToRemove) {
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
        state.subTotal -= productToRemove.price;
      }
    },

    updatePhone: (state, action) => {
      state.phone = action.payload;
    },
    updateAddress: (state, action) => {
      state.address = action.payload;
    },
    clearCart: (state) => {
      state.products = [];
      state.address = "";
      state.phone = "";
      state.subTotal = 0;
      // storage.removeItem("persist:cart");
    },
  },
});

// products
export const orderedProductsSelector = (state: RootState) => {
  return state.cart.products;
};

// subTotal
export const sunTotalSelector = (state: RootState) => {
  return state.cart.subTotal;
};

export const orderSelector = (state: RootState) => {
  return {
    items: state.cart.products.map((product) => ({
      itemId: product._id,
      sellerId: product.sellerId,
    })),
    phone: state.cart.phone,
    address: state.cart.address,
  };
};

// address

export const addressSelector = (state: RootState) => {
  return state.cart.address;
};

export const phoneSelector = (state: RootState) => {
  return state.cart.phone;
};

export const {
  addProduct,
  removeProduct,
  updatePhone,
  updateAddress,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
