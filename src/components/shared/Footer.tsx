import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Footer = () => {
  return (
    <div className="bg-[#1a1a1a] px-2 lg:px-5 xl:px-20 font-sans mt-28">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 py-28">
        {/* 1st row */}
        <div className="col-span-1 lg:col-span-2">
          <h1 className="text-white text-4xl">LOGO</h1>
          <p className="text-neutral-400 text-xl mt-3">
            We make interiors infused with the spirit of contemporary design and
            minimalist philosophies.
          </p>
        </div>
        {/* 2nd row */}
        <div className="space-y-3">
          <h1 className="text-white text-2xl uppercase">Designers</h1>
          <p className="text-neutral-400 hover:text-white text-xl">
            Ivana Kostadinova
          </p>
          <p className="text-neutral-400 hover:text-white text-xl">
            ItalYmobile
          </p>
          <p className="text-neutral-400 hover:text-white text-xl">
            Sweden Int
          </p>
          <p className="text-neutral-400 hover:text-white text-xl">
            Arch France
          </p>
        </div>
        {/* 3rd row */}
        <div className="space-y-3 w-[300px] xl:-ml-10">
          <h1 className="text-white text-2xl uppercase">FaQ</h1>
          <p className="text-neutral-400 hover:text-white text-xl">
            Where can I find your catalog?
          </p>
          <p className="text-neutral-400 hover:text-white text-xl">
            Can I make online purchase?
          </p>
          <p className="text-neutral-400 hover:text-white text-xl">
            When can I visit your studio?
          </p>
          <p className="text-neutral-400 hover:text-white text-xl">
            How long does shipping take?
          </p>
        </div>
        {/* 4th row */}
        <div>
          <h1 className="text-white text-2xl uppercase">Subscribe</h1>
          <Input className="border-none mt-2" placeholder="E-mail" />
          <hr />
          <p className="text-neutral-400 hover:text-white text-base mt-2">
            * Get all the latest offers & info
          </p>
          <div className="flex justify-center">
            <Button
              variant="ghost"
              className="mt-4 text-[#B59175] border-2 border-[#B59175] rounded-none px-10"
            >
              SUBMIT
            </Button>
          </div>
        </div>
      </div>
      <hr />
      <div className="py-10 text-center">
        <p className="text-neutral-400 text-base">
          © 2025 Qode Interactive, All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
