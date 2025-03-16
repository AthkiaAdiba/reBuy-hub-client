import { verifyOrder } from "@/services/Cart";
import OrderCard from "@/components/modules/order/OrderCard";

type TSearchParams = Promise<{ [key: string]: string | string | undefined }>;

const VerifyOrderPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const query = await searchParams;
  const { data: order } = await verifyOrder(query);
  const orderData = order[0];

  return (
    <div>
      <OrderCard orderData={orderData} />
    </div>
  );
};

export default VerifyOrderPage;
