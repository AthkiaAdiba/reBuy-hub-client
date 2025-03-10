import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RxDashboard } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthService";
import { protectedRoutes } from "@/contants";
import { usePathname, useRouter } from "next/navigation";

const PopOver = () => {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <div>
          <Image
            src={user?.image || "/profile.jpg"}
            alt="Profile image"
            height={100}
            width={100}
            className="h-10 w-10 rounded-full bg-white"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="bg-[#f6dfd1] w-44 text-lg font-sans">
        <p>{user?.name}</p>
        <Link href="/dashboard" className="flex items-center gap-2">
          <RxDashboard /> Dashboard
        </Link>
        <h1
          onClick={handleLogout}
          className="flex items-center gap-2 cursor-pointer"
        >
          <IoIosLogOut /> Log Out
        </h1>
      </PopoverContent>
    </Popover>
  );
};

export default PopOver;
