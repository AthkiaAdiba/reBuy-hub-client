import MyButton from "@/components/shared/MyButton";
import { TList } from "@/types/list";
import Image from "next/image";

const ProductDetails = ({ product }: { product: TList }) => {
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
        <MyButton label="ADD TO CART" />
      </div>
    </div>
  );
};

export default ProductDetails;
