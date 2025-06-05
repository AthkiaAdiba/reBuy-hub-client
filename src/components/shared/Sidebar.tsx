import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  MdCategory,
  MdDiscount,
  MdMovie,
  MdRateReview,
  MdSpaceDashboard,
  MdSubscriptions,
  MdPerson,
  MdReceipt,
} from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { useUser } from "@/context/UserContext";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const adminRoutes = [
  { name: "Overview", icon: <MdSpaceDashboard />, link: "/admin/dashboard" },
  { name: "Profile", icon: <MdMovie />, link: "/admin/dashboard/profile" },
  { name: "Users", icon: <FaUsers />, link: "/admin/dashboard/users" },
  {
    name: "AllProducts",
    icon: <MdRateReview />,
    link: "/admin/dashboard/allproducts",
  },
  {
    name: "Categories",
    icon: <MdCategory />,
    link: "/admin/dashboard/categories",
  },
  { name: "Discount", icon: <MdDiscount />, link: "/dashboard/discount" },
  {
    name: "Subscribers",
    icon: <MdSubscriptions />,
    link: "/dashboard/subscribers",
  },
];

const userRoutes = [
  {
    name: "Overview",
    link: "/user/dashboard",
    icon: <MdPerson />,
  },
  {
    name: "Profile",
    link: "/user/dashboard/profile",
    icon: <MdPerson />,
  },
  {
    name: "My Products",
    link: "/user/dashboard/products",
    icon: <MdReceipt />,
  },
  {
    name: "Categories",
    icon: <MdCategory />,
    link: "/user/dashboard/categories",
  },
  {
    name: "Purchase History",
    link: "/user/dashboard/purchase-history",
    icon: <MdMovie />,
  },
  {
    name: "Sales History",
    link: "/user/dashboard/sales-history",
    icon: <MdRateReview />,
  },
];

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const pathname = usePathname();
  const { user } = useUser();

  const routes =
    user?.role === "admin"
      ? adminRoutes
      : user?.role === "user"
      ? userRoutes
      : [];

  return (
    <aside
      className={`fixed z-40 top-0 left-0 h-full w-64 bg-[#010527]   border-r border-[#010e65] transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static lg:block`}
    >
      <div className="relative p-6 h-full flex flex-col">
        {/* Close Button (visible only on mobile) */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white lg:hidden"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">
            {user?.role === "admin" ? "Admin Dashboard" : "User Dashboard"}
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 border-t pt-2 border-[#00175f]/50">
          {routes?.map((item) => (
            <Link
              key={item?.name}
              href={`${item.link}`}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                pathname === item.link ? "bg-[#00175f]/60" : ""
              } hover:bg-[#00175f]/60 transition-colors text-gray-300 hover:text-white`}
            >
              <span className="material-icons-outlined ">{item?.icon}</span>
              {item?.name}
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-[#00175f]/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
              <span className="text-purple-400">⚙️</span>
            </div>
            <span className="text-sm text-gray-400">Settings</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
