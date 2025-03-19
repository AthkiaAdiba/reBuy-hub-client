import Address from "@/components/modules/cart/Address";
import CartProducts from "@/components/modules/cart/CartProducts";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";

const CartPage = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12 lg:gap-8 my-5 px-2 sm:px-4 lg:px-16">
      <CartProducts />
      <Address />
      <PaymentDetails />
    </div>
  );
};

export default CartPage;
