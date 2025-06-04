import DashboardCard from "@/components/modules/dashboard/DashboardCard/DashboardCard";

const UserDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Metric Cards */}
      <DashboardCard
        title="Total Sales"
        value="$12,500"
        change="+15%"
        icon="dollar-sign"
        color="bg-blue-500"
      />
      <DashboardCard
        title="New Listings"
        value="345"
        change="+8%"
        icon="box"
        color="bg-green-500"
      />
      <DashboardCard
        title="Pending Orders"
        value="23"
        change="-2%"
        icon="shopping-cart"
        color="bg-yellow-500"
      />
      <DashboardCard
        title="Active Users"
        value="1,200"
        change="+10%"
        icon="users"
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

      {/* Quick Stats / Charts (Placeholder) */}
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

export default UserDashboard;
