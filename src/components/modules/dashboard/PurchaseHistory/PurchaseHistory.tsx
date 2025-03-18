/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useUser } from "@/context/UserContext";
import { getMyPurchaseHistory } from "@/services/Cart";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import PurchaseCard from "./PurchaseCard";
import { TPurchaseAndSales } from "@/types/purchase";

const PurchaseHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        if (user) {
          const res = await getMyPurchaseHistory(user?.userId);
          setPurchases(res?.data);
        }
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div>
      {!isLoading && (
        <div className="px-2 md:px-6 xl:px-14 mb-10">
          {purchases?.map((purchase: TPurchaseAndSales) => (
            <PurchaseCard key={purchase._id} purchase={purchase} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PurchaseHistory;
