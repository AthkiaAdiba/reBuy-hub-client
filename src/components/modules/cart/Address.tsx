"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateAddress, updatePhone } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";

const Address = () => {
  const dispatch = useAppDispatch();

  const handlePhoneSelect = (phone: string) => {
    dispatch(updatePhone(phone));
  };

  const handleShippingAddressSelect = (address: string) => {
    dispatch(updateAddress(address));
  };

  return (
    <div className="p-5 col-span-4 shadow-lg font-sans mb-10 mt-14 space-y-2">
      <div className="space-y-4">
        <Label htmlFor="address" className="text-xl font-semibold">
          Shipping Address:
        </Label>
        <Input
          onChange={(e) => handleShippingAddressSelect(e.target.value)}
          className="bg-white rounded-none shadow-md mt-2"
          type="text"
          id="address"
        />
        <Label htmlFor="phone" className="text-xl font-semibold">
          Phone:
        </Label>
        <Input
          onChange={(e) => handlePhoneSelect(e.target.value)}
          className="bg-white rounded-none shadow-md mt-2"
          type="number"
          id="phone"
        />
      </div>
    </div>
  );
};

export default Address;
