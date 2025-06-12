"use client";

import { updateAddress, updatePhone } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";

const BillingDetails = () => {
  const dispatch = useAppDispatch();

  const handlePhoneSelect = (phone: string) => {
    console.log(phone);
    dispatch(updatePhone(phone));
  };

  const handleShippingAddressSelect = (address: string) => {
    console.log(address);
    dispatch(updateAddress(address));
  };

  return (
    <div className="pt-8">
      <h1 className="text-3xl font-semibold text-gray-900 mb-12 tracking-wide">
        BILLING INFORMATION
      </h1>

      <div className="space-y-8">
        {/* Address */}
        <div className="space-y-2">
          <label className="block text-gray-600 text-lg">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            onChange={(e) => handleShippingAddressSelect(e.target.value)}
            id="address"
            className="w-full bg-transparent border-0 border-b border-gray-300 pb-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
          />
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <label className="block text-gray-600 text-lg">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="phone"
            onChange={(e) => handlePhoneSelect(e.target.value)}
            className="w-full bg-transparent border-0 border-b border-gray-300 pb-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;
