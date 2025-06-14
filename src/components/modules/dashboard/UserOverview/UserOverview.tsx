"use client";

import { TUserOverview } from "@/types/userOverview";
import { MdContentCopy, MdShoppingCart, MdAttachMoney } from "react-icons/md";
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

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
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
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between transition-transform transform hover:scale-105">
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
    </div>
  );
};

const UserOverview = ({ userOverview }: { userOverview: TUserOverview }) => {
  // Process seller items data for charts
  const monthlyData = userOverview.sellerItems
    .reduce((acc: MonthlyData[], item) => {
      const date = new Date(item.transactionCreatedAt);
      const monthYear = `${date.toLocaleString("default", {
        month: "short",
      })} ${date.getFullYear()}`;

      const existingMonth = acc.find((item) => item.month === monthYear);
      if (existingMonth) {
        existingMonth.amount += item.price * item.quantity;
        existingMonth.count += 1;
      } else {
        acc.push({
          month: monthYear,
          amount: item.price * item.quantity,
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
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Total Contents"
          value={userOverview.totalContents}
          icon={<MdContentCopy className="w-7 h-7 text-white" />}
          color="bg-purple-500"
        />
        <DashboardCard
          title="Total Transactions"
          value={userOverview.totalTransactions}
          icon={<MdShoppingCart className="w-7 h-7 text-white" />}
          color="bg-orange-500"
        />
        <DashboardCard
          title="Total Earnings"
          value={currencyFormatter(userOverview.totalEarnings)}
          icon={<MdAttachMoney className="w-7 h-7 text-white" />}
          color="bg-yellow-500"
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

export default UserOverview;
