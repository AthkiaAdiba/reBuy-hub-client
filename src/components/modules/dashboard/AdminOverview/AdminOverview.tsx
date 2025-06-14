"use client";

import { TFetchedTransaction } from "@/types/transaction";
import {
  MdPeople,
  MdContentCopy,
  MdAttachMoney,
  MdShoppingCart,
} from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { currencyFormatter } from "@/lib/currencyFormatter";

type TAdminOverview = {
  totalUsers: number;
  totalSubscribesUsers: number;
  totalContents: number;
  totalTransactions: number;
  totalEarnings: number;
};

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  tooltip: string;
}

interface MonthlyData {
  month: string;
  amount: number;
  count: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  color,
  tooltip,
}) => {
  return (
    <div className="relative group bg-white rounded-lg shadow-md p-6 flex items-center justify-between transition-transform transform hover:scale-105">
      <div className="flex-1 min-w-0">
        <h4 className="text-gray-500 text-sm font-medium uppercase truncate">
          {title}
        </h4>
        <p className="text-2xl font-bold text-gray-900 mt-1 truncate">
          {value}
        </p>
      </div>
      <div className={`p-3 rounded-full ${color} ml-4 flex-shrink-0`}>
        {icon}
      </div>
      {/* Tooltip */}
      <div className="invisible group-hover:visible absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 bg-gray-900 text-white text-xs rounded px-3 py-2 shadow-lg whitespace-nowrap">
        {tooltip}
        <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-gray-900 transform rotate-45"></div>
      </div>
    </div>
  );
};

const AdminOverview = ({
  transactions,
  adminOverview,
}: {
  transactions: TFetchedTransaction[];
  adminOverview: TAdminOverview;
}) => {
  // Process transaction data for charts
  const monthlyData = transactions
    .reduce((acc: MonthlyData[], transaction) => {
      const date = new Date(transaction.createdAt);
      const monthYear = `${date.toLocaleString("default", {
        month: "short",
      })} ${date.getFullYear()}`;

      const existingMonth = acc.find((item) => item.month === monthYear);
      if (existingMonth) {
        existingMonth.amount += transaction.totalPrice;
        existingMonth.count += 1;
      } else {
        acc.push({
          month: monthYear,
          amount: transaction.totalPrice,
          count: 1,
        });
      }
      return acc;
    }, [])
    .sort((a, b) => {
      const [aMonth, aYear] = a.month.split(" ");
      const [bMonth, bYear] = b.month.split(" ");
      return (
        new Date(`${aMonth} 1, ${aYear}`).getTime() -
        new Date(`${bMonth} 1, ${bYear}`).getTime()
      );
    });

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto px-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        <DashboardCard
          title="Total Users"
          value={adminOverview.totalUsers}
          icon={<MdPeople className="w-7 h-7 text-white" />}
          color="bg-blue-500"
          tooltip={`Total users: ${adminOverview.totalUsers.toLocaleString()}`}
        />
        <DashboardCard
          title="Subscribed Users"
          value={adminOverview.totalSubscribesUsers}
          icon={<FaUsers className="w-7 h-7 text-white" />}
          color="bg-green-500"
          tooltip={`Subscribed users: ${adminOverview.totalSubscribesUsers.toLocaleString()}`}
        />
        <DashboardCard
          title="Total Contents"
          value={adminOverview.totalContents}
          icon={<MdContentCopy className="w-7 h-7 text-white" />}
          color="bg-purple-500"
          tooltip={`Total contents: ${adminOverview.totalContents.toLocaleString()}`}
        />
        <DashboardCard
          title="Total Transactions"
          value={adminOverview.totalTransactions}
          icon={<MdShoppingCart className="w-7 h-7 text-white" />}
          color="bg-orange-500"
          tooltip={`Total transactions: ${adminOverview.totalTransactions.toLocaleString()}`}
        />
        <DashboardCard
          title="Total Earnings"
          value={currencyFormatter(adminOverview.totalEarnings)}
          icon={<MdAttachMoney className="w-7 h-7 text-white" />}
          color="bg-yellow-500"
          tooltip={`Total earnings: ${currencyFormatter(
            adminOverview.totalEarnings
          )}`}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Revenue Overview
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => currencyFormatter(value as number)}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transactions Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Transaction Volume
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
