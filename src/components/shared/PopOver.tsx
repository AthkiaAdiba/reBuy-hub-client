import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RxDashboard } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";

const PopOver = () => {
  //   const handleLogout = () => {
  //     disPatch(logOut());
  //   };

  return (
    <Popover>
      <PopoverTrigger>
        <div>
          <Image
            src="/banner1.webp"
            alt="Profile image"
            height={100}
            width={100}
            className="h-10 w-10 rounded-full bg-white"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="bg-[#f6dfd1] w-44 text-lg font-sans">
        <p>Athkia Adiba Tonne</p>
        <Link href="/dashboard" className="flex items-center gap-2">
          <RxDashboard /> Dashboard
        </Link>
        <h1 className="flex items-center gap-2">
          <IoIosLogOut /> Log Out
        </h1>
      </PopoverContent>
    </Popover>
  );
};

export default PopOver;
