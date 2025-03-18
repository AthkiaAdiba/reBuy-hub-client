/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useUser } from "@/context/UserContext";
import { getMySalesHistory } from "@/services/Cart";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import SalesCard from "./SalesCard";
import { TPurchaseAndSales } from "@/types/purchase";

const SalesHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sales, setSales] = useState([]);
  const { user } = useUser();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      if (user) {
        const res = await getMySalesHistory(user?.userId);
        setSales(res?.data);
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {!isLoading && (
        <div className="px-2 md:px-6 xl:px-14 mb-10">
          {sales?.map((sale: TPurchaseAndSales) => (
            <SalesCard key={sale._id} sale={sale} fetchData={fetchData} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SalesHistory;
