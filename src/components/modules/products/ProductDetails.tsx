"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { addProduct } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TList } from "@/types/list";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ProductDetails = ({ product }: { product: TList }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useUser();

  const handleAddProduct = (item: TList) => {
    if (!user) {
      router.push("/login");
      throw new Error("Please log in first!");
    }

    if (user?.userId === item?.sellerId) {
      toast.error("It is your Item. You can not buy!");
      return;
    }

    if (item?.status === "sold") {
      toast.error("This item is not available!");
      return;
    }

    dispatch(addProduct(item));
    toast.success("Your chosen product is added to the cart.");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 my-5 font-sans">
      <div>
        <Image
          src={product?.images[0]}
          alt="product image"
          width={500}
          height={500}
          className="w-full object-cover h-80"
        />
        <div className="grid grid-cols-3 gap-4 mt-5">
          {product?.images.slice(0, 3).map((image: string, idx: number) => (
            <Image
              key={idx}
              src={image}
              alt="product image"
              width={500}
              height={500}
              className="w-full object-cover h-40"
            />
          ))}
        </div>
      </div>
      <div className="bg-white rounded-md p-4">
        <h2 className="font-bold text-4xl mb-4">{product?.title}</h2>
        <h2 className="text-xl mb-4">$ {product?.price}</h2>
        <h2 className="text-xl mb-4 uppercase font-semibold">
          {product?.status}
        </h2>
        <p className="text-justify text-gray-500 font-light text-xl mb-4">
          {product?.description}
        </p>
        <p className="text-justify text-gray-500 font-light text-2xl mb-4">
          {product?.condition}
        </p>
        <p className="text-justify font-light text-2xl mb-4">
          {product?.category}
        </p>
        <p className="text-justify font-light text-2xl mb-4">
          {product?.location}
        </p>
        <Button
          onClick={() => handleAddProduct(product)}
          variant="outline"
          className="rounded-none px-8 font-sans py-4 text-[#B59175] border-[#B59175] hover:bg-[#B59175] hover:text-white"
        >
          ADD TO CART
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
