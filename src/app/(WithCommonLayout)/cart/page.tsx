import Address from "@/components/modules/cart/Address";
import CartProducts from "@/components/modules/cart/CartProducts";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";

const CartPage = () => {
  return (
    <div className="grid grid-cols-12 gap-8 my-5 px-2 lg:px-16">
      <CartProducts />
      <Address />
      <PaymentDetails />
    </div>
  );
};

export default CartPage;
