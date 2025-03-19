import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TList } from "@/types/list";

interface WishlistState {
  products: TList[];
}

const initialState: WishlistState = {
  products: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const productExists = state.products.some(
        (product) => product._id === action.payload._id
      );

      if (!productExists) {
        state.products.push(action.payload);
      }
    },

    removeFromWishlist: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },

    clearWishlist: (state) => {
      state.products = [];
    },
  },
});

// Wishlist Selectors
export const wishlistProductsSelector = (state: RootState) => {
  return state.wishlist.products;
};

// Export actions
export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

// Export reducer
export default wishlistSlice.reducer;
