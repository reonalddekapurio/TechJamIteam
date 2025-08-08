"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { SearchBar } from "@/components/shared/SearchBar";
import { SearchShopCard } from "@/components/features/SearchShopCard";
import { FooterNavItem } from "@/components/shared/FooterNavItem";

export default function SearchResults() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const animationClass = `transition-opacity transition-transform duration-700 ease-out ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }`;

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen gap-4 fixed top-0 left-0 w-full z-20 bg-[#FFFAF1] pb-4">
        <SearchBar />
        <p className="text-lg font-bold text-[#8B4158] border-b-2 border-solid border-[#8B4158]">
          検索結果
        </p>
      </div>
      <div
        className={`${animationClass} flex flex-col items-center justify-center w-full gap-4 pt-32`}
      >
        <SearchShopCard ImageType="shop2" />
        <SearchShopCard ImageType="shop2" />
        <SearchShopCard ImageType="shop2" />
        <SearchShopCard ImageType="shop2" />
        <SearchShopCard ImageType="shop2" />
        <SearchShopCard ImageType="shop2" />
        <SearchShopCard ImageType="shop2" />
        <SearchShopCard ImageType="shop2" />
        <SearchShopCard ImageType="shop2" />
        <SearchShopCard ImageType="shop2" />
      </div>

      <div className="flex flex-col items-center justify-center fixed bottom-6 left-0 w-full">
        <FooterNavItem />
      </div>
    </>
  );
}
