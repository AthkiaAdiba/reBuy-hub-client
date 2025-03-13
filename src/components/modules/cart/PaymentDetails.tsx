import { Button } from "@/components/ui/button";

const PaymentDetails = () => {
  return (
    <div className="border-2 border-white bg-background brightness-105 col-span-4 h-fit p-5 shadow-lg">
      <h1 className="text-2xl font-bold">Payment Details</h1>
      <div className="space-y-2 mt-4">
        <div className="flex justify-between">
          <p className="text-lg">Subtotal</p>
          <p className="font-semibold">0000</p>
        </div>
      </div>
      <div className="flex justify-between mt-10 mb-5">
        <p className="text-lg">Grand Total</p>
        <p className="font-semibold">0000</p>
      </div>
      <Button
        variant="ghost"
        className="rounded-none border-2 px-8 font-sans py-4 text-[#B59175] border-[#B59175] hover:bg-[#B59175] hover:text-white w-full"
      >
        Order Now
      </Button>
    </div>
  );
};

export default PaymentDetails;
