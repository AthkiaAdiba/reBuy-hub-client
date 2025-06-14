"use client";
import { HiMenuAlt1 } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { SlHandbag } from "react-icons/sl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import PopOver from "./PopOver";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import MyButton from "./MyButton";
import { useUser } from "@/context/UserContext";
import { useAppSelector } from "@/redux/hooks";
import { orderedProductsSelector } from "@/redux/features/cartSlice";
import { wishlistProductsSelector } from "@/redux/features/wishlistSlice";
import { getAllCategories } from "@/services/Categories";
import { TFetchedCategory } from "@/types/category";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState<TFetchedCategory[]>([]);
  const pathname = usePathname();
  const { user } = useUser();
  const allItems = useAppSelector(orderedProductsSelector);
  const wishlistItems = useAppSelector(wishlistProductsSelector);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await getAllCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchQuery = (query: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set(query, value.toString());

    router.push(`/products?${params.toString()}`, {
      scroll: false,
    });
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/categories", label: "Categories" },
    { href: "/offers", label: "Offers" },
    { href: "/about-us", label: "About Us" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  const megaMenuCategories = [
    {
      title: "Bed Room",
      categoryId: categories?.find((cat) => cat.categoryName === "Bedroom")
        ?._id,
      items: ["Beds", "Frames", "Cabinet", "Dressers", "Nightstands"],
    },
    {
      title: "Living Room",
      categoryId: categories?.find((cat) => cat.categoryName === "Living Room")
        ?._id,
      items: ["Coffee Table", "Sofa", "Bookshelf", "Magazine Rack", "TV Stand"],
    },
    {
      title: "Office",
      categoryId: categories?.find((cat) => cat.categoryName === "Office")?._id,
      items: [
        "Writing Desk",
        "Office Chair",
        "Filing Cabinet",
        "Bookcase",
        "Meeting Table",
      ],
    },
    {
      title: "Kitchen",
      categoryId: categories?.find((cat) => cat.categoryName === "Kitchen")
        ?._id,
      items: [
        "Kitchen Cabinets",
        "Dining Table",
        "Sideboard",
        "Microwave Stand",
        "Kitchen Counter",
      ],
    },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        pathname === "/"
          ? isScrolled
            ? "bg-white shadow-md text-black"
            : "bg-transparent text-white"
          : "bg-white shadow-md text-black"
      }`}
    >
      <div className="container mx-auto px-2 lg:px-16">
        {/* Top Bar */}
        <div className="hidden lg:flex justify-between items-center py-4 text-xl border-b">
          <div className="flex items-center gap-4">
            <span>Free shipping on orders over $50</span>
            <span className="opacity-50">|</span>
            <span>24/7 Customer Support</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/track-order"
              className="hover:text-[#B59175] transition-colors"
            >
              Track Order
            </Link>
            <Link
              href="/store-locator"
              className="hover:text-[#B59175] transition-colors"
            >
              Store Locator
            </Link>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="hidden lg:flex justify-between items-center py-4">
          <div className="flex items-center gap-2 xl:gap-6">
            <div className="text-2xl xl:text-3xl font-bold">TOBEL</div>
            <ul className="flex gap-2 xl:gap-6 text-base xl:text-lg font-medium">
              {navLinks.map(({ href, label }) => (
                <li key={href} className="relative group">
                  {label === "Categories" ? (
                    <span
                      className={`${
                        pathname === href ? "text-[#B59175]" : "text-inherit"
                      } hover:text-[#B59175] transition-colors cursor-pointer`}
                    >
                      {label}
                    </span>
                  ) : (
                    <Link
                      href={href}
                      className={`${
                        pathname === href ? "text-[#B59175]" : "text-inherit"
                      } hover:text-[#B59175] transition-colors`}
                    >
                      {label}
                    </Link>
                  )}
                  {label === "Categories" && (
                    <div className="absolute hidden group-hover:block w-[1200px] left-0 top-full bg-white shadow-lg p-6">
                      <div className="grid grid-cols-4 gap-8">
                        {megaMenuCategories.map((category) => (
                          <div key={category.title} className="min-w-[250px]">
                            <h3 className="font-bold text-lg mb-4 text-black">
                              <Link
                                href={`/products?category=${category.categoryId}`}
                                className="hover:text-[#B59175]"
                              >
                                {category.title}
                              </Link>
                            </h3>
                            <ul className="space-y-2">
                              {category.items.map((item) => (
                                <li key={item}>
                                  <Link
                                    href={`/products?category=${category.categoryId}`}
                                    className="text-gray-600 hover:text-[#B59175]"
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-2 xl:gap-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className={`pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#B59175] w-[140px] xl:w-[220px] ${
                  pathname === "/"
                    ? isScrolled
                      ? "bg-white"
                      : "bg-white/10 border-white/20 text-white placeholder-white/50"
                    : "bg-white"
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch
                onClick={(e) => {
                  e.preventDefault();
                  if (!searchTerm.trim()) return;
                  handleSearchQuery("searchTerm", searchTerm);
                  setSearchTerm("");
                }}
                type="submit"
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  pathname === "/"
                    ? isScrolled
                      ? "text-gray-400"
                      : "text-white/50"
                    : "text-gray-400"
                }`}
              />
            </div>
            {user ? (
              <PopOver />
            ) : (
              <Link href="/login">
                <MyButton label="LOG IN" />
              </Link>
            )}
            <Link href="/wishlist" className="relative">
              <FaRegHeart
                className={`text-xl xl:text-2xl hover:text-[#B59175] transition-colors ${
                  pathname === "/"
                    ? isScrolled
                      ? "text-black"
                      : "text-white"
                    : "text-black"
                }`}
              />
              <span className="absolute -top-2 -right-2 bg-[#B59175] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {wishlistItems?.length || 0}
              </span>
            </Link>
            <Link href="/cart" className="relative">
              <button
                className={`flex items-center gap-1 xl:gap-2 text-base xl:text-lg font-medium hover:text-[#B59175] transition-colors ${
                  pathname === "/"
                    ? isScrolled
                      ? "text-black"
                      : "text-white"
                    : "text-black"
                }`}
              >
                <SlHandbag /> CART
              </button>
              <span className="absolute -top-2 -right-2 bg-[#B59175] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {allItems?.length || 0}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="flex justify-between items-center py-4 lg:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="text-3xl"
            >
              {isDrawerOpen ? <RxCross1 /> : <HiMenuAlt1 />}
            </button>
            <div className="text-2xl font-bold">TOBEL</div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/wishlist" className="relative">
              <FaRegHeart
                className={`text-2xl hover:text-[#B59175] transition-colors ${
                  pathname === "/"
                    ? isScrolled
                      ? "text-black"
                      : "text-white"
                    : "text-black"
                }`}
              />
              <span className="absolute -top-2 -right-2 bg-[#B59175] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {wishlistItems?.length || 0}
              </span>
            </Link>
            <Link href="/cart" className="relative">
              <SlHandbag
                className={`text-2xl ${
                  pathname === "/"
                    ? isScrolled
                      ? "text-black"
                      : "text-white"
                    : "text-black"
                }`}
              />
              <span className="absolute -top-2 -right-2 bg-[#B59175] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {allItems?.length || 0}
              </span>
            </Link>
            {user ? (
              <PopOver />
            ) : (
              <Link href="/login">
                <MyButton label="LOG IN" />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {isDrawerOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-white">
            <div className="p-4 overflow-y-auto h-full">
              <div className="flex justify-between items-center mb-6">
                <div className="text-2xl font-bold">TOBEL</div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-3xl text-black"
                >
                  <RxCross1 />
                </button>
              </div>
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border rounded-full text-black placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch
                  onClick={(e) => {
                    e.preventDefault();
                    if (!searchTerm.trim()) return;
                    handleSearchQuery("searchTerm", searchTerm);
                    setSearchTerm("");
                  }}
                  type="submit"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
              <ul className="space-y-4">
                {navLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`block py-2 ${
                        pathname === href ? "text-[#B59175]" : "text-black"
                      }`}
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/wishlist"
                    className="block py-2"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Wishlist
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
