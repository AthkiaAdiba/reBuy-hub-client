import React from "react";
import { MdDashboard, MdOutlineShoppingCart, MdPeople } from "react-icons/md";
import { FaBox } from "react-icons/fa";

interface DashboardCardProps {
  title: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  change,
  icon,
  color,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between transition-transform transform hover:scale-105">
      <div>
        <h4 className="text-gray-500 text-sm font-medium uppercase">{title}</h4>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        {change && (
          <p
            className={`text-sm mt-1 ${
              change.startsWith("+") ? "text-green-600" : "text-red-600"
            }`}
          >
            {change} Since last month
          </p>
        )}
      </div>
      <div className={`p-3 rounded-full ${color}`}>{icon}</div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Metric Cards */}
      <DashboardCard
        title="Total Sales"
        value="$12,500"
        change="+15%"
        icon={<MdDashboard className="w-7 h-7 text-white" />}
        color="bg-blue-500"
      />
      <DashboardCard
        title="New Listings"
        value="345"
        change="+8%"
        icon={<FaBox className="w-7 h-7 text-white" />}
        color="bg-green-500"
      />
      <DashboardCard
        title="Pending Orders"
        value="23"
        change="-2%"
        icon={<MdOutlineShoppingCart className="w-7 h-7 text-white" />}
        color="bg-yellow-500"
      />
      <DashboardCard
        title="Active Users"
        value="1,200"
        change="+10%"
        icon={<MdPeople className="w-7 h-7 text-white" />}
        color="bg-purple-500"
      />

      {/* Recent Activity */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Activities
        </h3>
        <ul className="space-y-3">
          <li className="flex items-center text-gray-700">
            <span className="text-sm text-gray-500 mr-3">10:30 AM</span>
            <span className="font-medium">New product added:</span> Vintage
            Wooden Chair
          </li>
          <li className="flex items-center text-gray-700">
            <span className="text-sm text-gray-500 mr-3">09:15 AM</span>
            <span className="font-medium">
              Order #RF00123 processed for
            </span>{" "}
            John Doe
          </li>
          <li className="flex items-center text-gray-700">
            <span className="text-sm text-gray-500 mr-3">Yesterday</span>
            <span className="font-medium">User registered:</span> Jane Smith
          </li>
          <li className="flex items-center text-gray-700">
            <span className="text-sm text-gray-500 mr-3">2 days ago</span>
            <span className="font-medium">Product updated:</span> Antique
            Dresser price changed
          </li>
        </ul>
      </div>

      {/* Quick Stats / Charts */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Sales Performance (Last 30 Days)
        </h3>
        <div className="h-48 flex items-center justify-center text-gray-400 border border-dashed border-gray-300 rounded-lg">
          <p>Chart Placeholder</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
