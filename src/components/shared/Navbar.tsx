"use client";
import { HiMenuAlt1 } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { SlHandbag } from "react-icons/sl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import PopOver from "./PopOver";
import { FaRegHeart } from "react-icons/fa";
import MyButton from "./MyButton";
import { useUser } from "@/context/UserContext";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
  ];

  return (
    <nav>
      <div className="container mx-auto px-2 lg:px-16">
        {/* Navbar for large screens */}
        <div className="hidden lg:flex justify-between items-center py-4">
          <div className="flex items-center gap-6">
            <div>
              {/* <img src={logo} alt="" className="h-24 w-24" /> */}LOGO
            </div>
            <ul className="flex gap-10 text-2xl font-sans">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`${
                    pathname === href ? "text-[#B59175]" : "text-black"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-7">
            {user ? (
              <PopOver />
            ) : (
              <Link href="/login">
                <MyButton label="LOG IN" />
              </Link>
            )}
            <Link href="/wishlist">
              <FaRegHeart className="text-2xl" />
            </Link>
            <Link href="/cart" className="relative">
              <button className="flex items-center gap-2 text-xl font-medium">
                <SlHandbag /> CART
              </button>
              <p className="relative -mt-10 ml-3 text-2xl font-bold text-red-600">
                0{/* {cartData?.items?.length} */}
              </p>
            </Link>
          </div>
        </div>

        {/* Navbar for small and medium screens */}
        <div className="flex justify-between items-center py-4 lg:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="text-3xl"
            >
              {isDrawerOpen === true ? (
                <RxCross1></RxCross1>
              ) : (
                <HiMenuAlt1></HiMenuAlt1>
              )}
            </button>
            <div>
              {/* <img src={logo} alt="" className="h-14 w-14" /> */}LOGO
            </div>
          </div>
          {user ? (
            <PopOver />
          ) : (
            <Link href="/login">
              <MyButton label="LOG IN" />
            </Link>
          )}
        </div>

        {/* Drawer Menu */}
        {isDrawerOpen && (
          <div
            className={`lg:hidden absolute duration-1000 z-30 ${
              isDrawerOpen ? "top-14" : "-top-96"
            }`}
          >
            <ul className="space-y-4 p-4 flex flex-col bg-[#faf7f0] text-xl font-medium font-sans">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`${
                    pathname === href ? "text-[#B59175]" : "text-black"
                  }`}
                >
                  {label}
                </Link>
              ))}
              <Link href="/cart" className="relative">
                <button className="flex items-center gap-2 text-lg font-medium">
                  <SlHandbag /> CART
                </button>
                <p className="relative -mt-10 ml-3 text-2xl font-bold text-red-600">
                  0
                </p>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
