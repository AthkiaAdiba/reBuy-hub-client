import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { Home } from "lucide-react";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthService";
import { protectedRoutes } from "@/contants";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, setIsLoading } = useUser();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <header className="sticky top-0 z-20 shadow-xl py-4 px-10">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex-1 hidden sm:block">
          <h2 className="text-2xl font-bold pl-10 md:pl-10 lg:pl-0 pt-1">
            Dashboard Overview
          </h2>
          <p className="text-base mt-1 pl-10 md:pl-10 lg:pl-0">
            Welcome back, {user?.name}
          </p>
        </div>

        <div className="flex justify-end gap-4 w-full md:w-auto">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2  cursor-pointer p-2 rounded-lg transition-colors"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center">
                {user?.image ? (
                  <Image
                    width={150}
                    height={150}
                    src={user?.image}
                    alt={user?.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-purple-400">👤</span>
                )}
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0  mt-2 w-48 bg-[#000a3a] border border-[#00175f] rounded-lg shadow-lg py-2">
                <h1 className="text-white pl-3">{user?.name}</h1>
                <Link
                  href={"/"}
                  className="w-full px-3 py-2 text-left text-gray-300 hover:bg-[#00175f]/30 transition-colors flex items-center gap-2"
                >
                  <Home className="text-white w-5 h-5" />
                  Home
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 cursor-pointer  py-2 text-left text-gray-300 hover:bg-[#00175f]/30 transition-colors flex items-center gap-2"
                >
                  <FaSignOutAlt className="text-red-400" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden absolute top-4 left-4 z-50 p-2 rounded-lg"
      >
        ☰
      </button>
    </header>
  );
};

export default Header;
