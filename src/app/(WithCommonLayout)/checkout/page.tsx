import BillingDetails from "@/components/modules/checkout/BillingDetails";
import OrderDetails from "@/components/modules/checkout/OrderDetails";

const CheckoutPage = () => {
  return (
    <div className="px-2 lg:px-16 pt-[30%] md:pt-[18%] lg:pt-[20%] xl:pt-[10%]">
      <BillingDetails />
      <OrderDetails />
    </div>
  );
};

export default CheckoutPage;
