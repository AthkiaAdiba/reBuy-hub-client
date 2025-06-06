/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { addOrRemoveOfferPrice } from "@/services/Listings";
import { TList } from "@/types/list";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface AddOrRemoveOfferPrice {
  item: TList;
  handleAddOrRemoveOfferPriceModalClose: () => void;
}

const AddOfferPriceModal = ({
  item,
  handleAddOrRemoveOfferPriceModalClose,
}: AddOrRemoveOfferPrice) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const toastId = toast.loading("Adding Offer price...", { duration: 2000 });

    const offerPriceData = {
      data: {
        offerPrice: Number(formData.offerPrice),
      },
      itemId: item._id,
    };

    try {
      const res = await addOrRemoveOfferPrice(offerPriceData);

      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else {
        toast.success(res?.message, { id: toastId });
        reset();
        handleAddOrRemoveOfferPriceModalClose();
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message, { id: toastId });
    }
  };

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
        <h2 className="text-2xl font-bold mb-6 text-[#00175f]">
          Add or Remove Offer price
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Category Name */}
          <div>
            <input
              type="number"
              {...register("offerPrice")}
              placeholder="Offer Price"
              className="w-full px-4 py-2 border border-[#1a2d6d] rounded-lg"
            />
          </div>
          {/* Form Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() => {
                handleAddOrRemoveOfferPriceModalClose();
                reset();
              }}
              className="px-6 py-2 cursor-pointer rounded-lg bg-white border-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-sm lg:text-base bg-[#1a2d6d] text-white cursor-pointer py-1 px-4 lg:px-6 lg:py-2 rounded-lg transition-colors"
            >
              Add Or Remove OfferPrice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOfferPriceModal;
