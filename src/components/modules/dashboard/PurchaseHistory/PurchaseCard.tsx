import { TItem, TPurchaseAndSales } from "@/types/purchase";

const PurchaseCard = ({ purchase }: { purchase: TPurchaseAndSales }) => {
  return (
    <div className="flex flex-col md:flex-row lg:flex-row justify-between mb-10 shadow-md border-2 rounded-md p-6">
      {/* 1st column */}
      <div>
        <div>
          <h1 className="text-2xl font-semibold mb-3">User Information</h1>
          <div className="space-y-1">
            <p>
              <span className="text-base font-semibold">User Id:</span>{" "}
              {purchase?.buyerId}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">User Name:</span>
              {purchase?.name}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">User Email:</span>
              {purchase?.email}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">
                User Address:
              </span>
              {purchase?.address}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">User Phone:</span>
              {purchase?.phone}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">Order Date:</span>
              {new Date(purchase?.createdAt).toLocaleString()}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">
                Last Updated:
              </span>
              {new Date(purchase?.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h1 className="text-2xl font-semibold mb-3">Products</h1>
          {purchase?.items?.map((item: TItem, i: number) => (
            <p key={i}>
              <span className="text-base font-semibold mr-1">ProductId:</span>
              {item?.itemId},
              <span className="text-base font-semibold mr-1">Price:</span>
              {item?.price}
            </p>
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
              <span className="text-base font-semibold mr-1">User Name:</span>
              {purchase?.name}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">User Email:</span>
              {purchase?.email}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">Address:</span>
              {purchase?.shippingAddress}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">Phone:</span>
              {purchase?.shippingPhone}
            </p>
          </div>
        </div>
      </div>
      {/* 3nd column */}
      <div>
        <div>
          <h1 className="text-2xl font-semibold mb-3">Order Summery</h1>
          <div className="space-y-1">
            <p>
              <span className="text-base font-semibold mr-1">Total Price:</span>
              {purchase?.totalPrice}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">Status:</span>
              <span
                className={`${
                  purchase?.transactionStatus === "Pending"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                } p-1 rounded-sm`}
              >
                {purchase?.transactionStatus}
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
              {purchase?.transaction?.id}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">Bank Status:</span>
              {purchase?.transaction?.bank_status}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">
                Transaction Date:
              </span>
              {new Date(purchase?.transaction?.date_time).toLocaleString()}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">
                Transaction Method:
              </span>
              {purchase?.transaction?.method}
            </p>
            <p>
              <span className="text-base font-semibold mr-1">
                Transaction Message:
              </span>
              {purchase?.transaction?.sp_message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCard;
