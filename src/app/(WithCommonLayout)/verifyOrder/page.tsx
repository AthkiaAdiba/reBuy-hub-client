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
    <div className="px-2 lg:px-16 pt-[30%] md:pt-[18%] lg:pt-[20%] xl:pt-[13%]">
      <OrderCard orderData={orderData} />
    </div>
  );
};

export default VerifyOrderPage;
