import React from "react";
import { FaHeart, FaTag } from "react-icons/fa";
import { MdMessage } from "react-icons/md";

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  color,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between transition-transform transform hover:scale-105">
      <div>
        <h4 className="text-gray-500 text-sm font-medium uppercase">{title}</h4>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>{icon}</div>
    </div>
  );
};

const UserDashboard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Welcome, John Doe!
      </h3>
      <p className="text-gray-700 mb-4">
        Here you can manage your favorite furniture pieces, view your listings,
        and communicate with sellers.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashboardCard
          title="My Favorites"
          value="12"
          icon={<FaHeart className="w-7 h-7 text-white" />}
          color="bg-pink-500"
        />
        <DashboardCard
          title="My Active Listings"
          value="3"
          icon={<FaTag className="w-7 h-7 text-white" />}
          color="bg-teal-500"
        />
        <DashboardCard
          title="Unread Messages"
          value="2"
          icon={<MdMessage className="w-7 h-7 text-white" />}
          color="bg-orange-500"
        />
      </div>
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">
          Recently Viewed
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center space-x-3">
            <img
              src="https://placehold.co/60x60/ADADAD/FFFFFF?text=Item1"
              alt="Item 1"
              className="rounded"
            />
            <div>
              <p className="font-medium">Modern Sofa</p>
              <p className="text-sm text-gray-600">$450</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center space-x-3">
            <img
              src="https://placehold.co/60x60/ADADAD/FFFFFF?text=Item2"
              alt="Item 2"
              className="rounded"
            />
            <div>
              <p className="font-medium">Dining Table Set</p>
              <p className="text-sm text-gray-600">$700</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
