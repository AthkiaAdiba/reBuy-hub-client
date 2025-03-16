"use client";
import { addProduct } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TList } from "@/types/list";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingBag4Line } from "react-icons/ri";
import { toast } from "sonner";

const ProductCard = ({ item }: { item: TList }) => {
  const dispatch = useAppDispatch();

  const handleAddProduct = (product: TList) => {
    dispatch(addProduct(product));
    toast.success("Your chosen product is added to the cart.");
  };

  return (
    <div className="font-sans mb-20">
      <Image
        src={item?.images[0]}
        alt="item image"
        width={500}
        height={1500}
        className="h-[450px]"
      />
      <div className="space-y-3 mt-5">
        <h1 className="text-2xl">{item?.title}</h1>
        <div className="flex justify-between items-center">
          <h1 className="text-xl">{item?.category}</h1>
          <div className="flex items-center gap-3 text-2xl">
            <Link href={`/products/${item?._id}`}>
              <FaEye />
            </Link>
            <FaRegHeart />
            <button onClick={() => handleAddProduct(item)}>
              <RiShoppingBag4Line />
            </button>
          </div>
        </div>
        <h1 className="text-xl">$ {item?.price}</h1>
      </div>
    </div>
  );
};

export default ProductCard;
