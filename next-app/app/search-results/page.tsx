"use client";

import Link from "next/link";
import Image from "next/image";

import { SearchBar } from "@/components/shared/SearchBar";
import { SearchShopCard } from "@/components/features/SearchShopCard";
import { FooterNavItem } from "@/components/shared/FooterNavItem";

export default function SearchResults() {
  return (
    <>
      <div className="flex flex-col items-center justify-center  w-screen gap-4 fixed top-0, left-0, w-full, z-index bg-[#FFF] pb-4">
        <SearchBar />
        <p className="text-lg font-bold text-[#8B4158] border-b-2 border-solid border-[#8B4158] ">
          検索結果
        </p>
      </div>

      <div className="flex flex-col items-center justify-center  wt-full gap-4 pt-30 ">
        <SearchShopCard ImageType="shop1" />
        <SearchShopCard ImageType="shop2" />
        <SearchShopCard ImageType="shop1" />
        <SearchShopCard ImageType="shop2" />
        <SearchShopCard ImageType="shop1" />
        <SearchShopCard ImageType="shop2" />
        <SearchShopCard ImageType="shop1" />
        <SearchShopCard ImageType="shop2" />
        <SearchShopCard ImageType="shop1" />
        <SearchShopCard ImageType="shop2" />
      </div>

      <div className="flex flex-col items-center justify-center fixed bottom-6 left-0, w-full">
        <FooterNavItem />
      </div>
    </>
  );
}
