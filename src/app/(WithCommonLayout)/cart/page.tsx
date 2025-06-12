import CartProducts from "@/components/modules/cart/CartProducts";
import CartTotals from "@/components/modules/cart/CartTotals";

const CartPage = () => {
  return (
    <div className="px-2 lg:px-16 pt-[30%] md:pt-[18%] lg:pt-[20%] xl:pt-[10%]">
      <CartProducts />
      <CartTotals />
    </div>
  );
};

export default CartPage;
