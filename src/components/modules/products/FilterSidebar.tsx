"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { statusArray } from "@/constants/products";
import { TList } from "@/types/list";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const FilterSidebar = ({ allItems }: { allItems: TList[] }) => {
  const [price, setPrice] = useState([0]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoriesArray = [
    ...new Map(
      allItems?.map((item) => [
        item.category,
        { category: item.category, _id: item._id },
      ])
    ).values(),
  ];

  const handleSearchQuery = (query: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set(query, value.toString());

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="p-6 md:[250px] lg:w-[300px] font-sans">
      <div className="flex justify-between gap-5 items-center mb-6">
        <h2 className="text-3xl font-semibold">Filter</h2>
        {searchParams.toString().length > 0 && (
          <Button
            onClick={() => {
              router.push(`${pathname}`, {
                scroll: false,
              });
            }}
            variant="ghost"
            className="rounded-none px-8 font-sans py-4 border-[#B59175] border-2 bg-[#B59175] text-white"
          >
            Clear Filters
          </Button>
        )}
      </div>
      {/* search */}
      <div className="flex w-full max-w-sm items-center mb-4">
        <Input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-40 rounded-none border-[#B59175] border-b-2 border-t-2 border-l-2"
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            if (!searchTerm.trim()) return;
            handleSearchQuery("searchTerm", searchTerm);
            setSearchTerm("");
          }}
          type="submit"
          variant="ghost"
          className="rounded-none px-8 font-sans py-4 border-[#B59175] border-2 bg-[#B59175] text-white"
        >
          Search
        </Button>
      </div>
      {/* Filter by Price */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Price</h2>
        <div className="flex items-center justify-between text-base mb-2">
          <span>$0</span>
        </div>
        <Slider
          max={500000}
          step={1}
          onValueChange={(value) => {
            setPrice(value);
            handleSearchQuery("price", value[0]);
          }}
          className="w-full"
        />
        <p className="text-base mt-2">Selected Price: ${price[0]}</p>
      </div>
      {/* Product Types */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Item Category</h2>
        <RadioGroup className="space-y-2">
          {categoriesArray?.map(
            (category: { category: string; _id: string }) => (
              <div key={category._id} className="flex items-center space-x-2">
                <RadioGroupItem
                  onClick={() =>
                    handleSearchQuery("category", category?.category)
                  }
                  value={category?.category}
                  id={category?.category}
                  className="h-6 w-6 border-2 border-[#B59175] text-[#B59175]  data-[state=checked]:border-[#B59175]"
                />
                <Label htmlFor={category?.category} className="text-xl">
                  {category?.category}
                </Label>
              </div>
            )
          )}
        </RadioGroup>
      </div>
      {/* Brands */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Status</h2>
        <RadioGroup className="space-y-2">
          {statusArray?.map((status: { status: string; _id: string }) => (
            <div key={status?._id} className="flex items-center space-x-2">
              <RadioGroupItem
                onClick={() => handleSearchQuery("status", status?.status)}
                value={status?.status}
                id={status?.status}
                className="h-6 w-6 border-2 border-[#B59175] text-[#B59175]  data-[state=checked]:border-[#B59175]"
              />
              <Label htmlFor={status?.status} className="text-xl">
                {status?.status}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterSidebar;
