/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { updateTransactionStatus } from "@/services/Cart";
import { TItem, TPurchaseAndSales } from "@/types/purchase";
import { toast } from "sonner";

type TStatusChange = {
  orderId: string;
  status: string;
};

const SalesCard = ({
  sale,
  fetchData,
}: {
  sale: TPurchaseAndSales;
  fetchData: () => void;
}) => {
  const handleUpdateOrderStatusToCompleted = async (data: TStatusChange) => {
    const toastId = toast.loading("Updating Order Status...", {
      duration: 2000,
    });

    if (sale?.transactionStatus === "Completed") {
      toast.info("This order is already completed.", { id: toastId });
      return;
    }

    if (data?.status !== "Paid") {
      toast.error(
        "This order is not paid. So, you can not change the status to Completed!",
        { id: toastId }
      );
      return;
    }

    try {
      const res = await updateTransactionStatus(data?.orderId);
      console.log(res);

      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else {
        toast.success(res?.message, { id: toastId });
        fetchData();
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message, { id: toastId });
    }
  };

  return (
    <div className="flex flex-col md:flex-row lg:flex-row justify-between mb-10 shadow-md border-2 rounded-md p-6">
      {/* 1st column */}
      <div>
        <div>
          <h1 className="text-2xl font-semibold mb-3">User Information</h1>
          <div className="space-y-1">
            <p>
              <span className="text-base font-semibold">Buyer Id:</span>
              {sale?.buyerId}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">Buyer Name:</span>
              {sale?.name}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">Buyer Email:</span>
              {sale?.email}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">
                Buyer Address:
              </span>
              {sale?.address}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">Buyer Phone:</span>
              {sale?.phone}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">Order Date:</span>
              {new Date(sale?.createdAt).toLocaleString()}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">
                Last Updated:
              </span>
              {new Date(sale?.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h1 className="text-2xl font-semibold mb-3">Product Ids</h1>
          {sale?.items?.map((item: TItem, i: number) => (
            <p key={i}>{item?.itemId},</p>
          ))}
        </div>
      </div>
      {/* 2nd column */}
      <div>
        {/*  */}
        <div>
          <h1 className="text-2xl font-semibold mb-3 mt-3">
            Shipping Information
          </h1>
          <div className="space-y-1">
            <p>
              <span className="text-base font-semibold mr-1">Buyer Name:</span>
              {sale?.name}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">Buyer Email:</span>
              {sale?.email}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">Address:</span>
              {sale?.shippingAddress}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">Phone:</span>
              {sale?.shippingPhone}
            </p>
          </div>
          <h1 className="text-xl font-semibold mb-3 mt-3">
            Complete the order
          </h1>
          <Button
            onClick={() =>
              handleUpdateOrderStatusToCompleted({
                orderId: sale?._id,
                status: sale?.status,
              })
            }
            className="rounded-none"
          >
            Click Here
          </Button>
        </div>
      </div>
      {/* 3nd column */}
      <div>
        <div>
          <h1 className="text-2xl font-semibold mb-3">Order Summery</h1>
          <div className="space-y-1">
            <p>
              <span className="text-base font-semibold mr-1">Total Price:</span>
              {sale?.totalPrice}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">Status:</span>
              <span
                className={`${
                  {
                    Pending: "bg-yellow-500",
                    Cancelled: "bg-red-500",
                    Completed: "bg-green-500",
                  }[sale?.transactionStatus] || ""
                } p-1 rounded-sm text-white`}
              >
                {sale?.transactionStatus}
              </span>
            </p>
          </div>
        </div>
        {/*  */}
        <div>
          <h1 className="text-2xl font-semibold mb-3 mt-3">
            Transaction Details
          </h1>
          <div className="space-y-1">
            <p>
              <span className="text-base font-semibold mr-1">
                Transaction Id:
              </span>
              {sale?.transaction?.id}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">Bank Status:</span>
              {sale?.transaction?.bank_status}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">
                Transaction Status:
              </span>
              {sale?.status}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">
                Transaction Date:
              </span>
              {new Date(sale?.transaction?.date_time).toLocaleString()}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">
                Transaction Method:
              </span>
              {sale?.transaction?.method}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">
                Transaction Message:
              </span>
              {sale?.transaction?.sp_message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesCard;
