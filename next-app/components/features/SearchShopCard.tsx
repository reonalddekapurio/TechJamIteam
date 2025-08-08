"use client";

import Link from "next/link";
import Image from "next/image";

export function SearchShopCard({ ImageType }: { ImageType: string }) {
  return (
    <div className="w-[390px] h-auto p-4  gap-4  border-b-2 border-solid border-[#F1D8E0] ">

      {ImageType === "shop1" ? (
        <p className="text[12px] font-bold text-[#8B4158]">カフェドエピ</p>
      ) : (
        <p className="text[12px] font-bold text-[#8B4158]">なごみ</p>
      )}

      <div className="flex gap-2 mt-1 mb-2 w-[180px] h-[165px]">

        <Image
          className="rounded-lg"
          src={`${ImageType === "shop1" ? "/shop-demo.svg" : "/shop-demo-nagomi.svg"}`}
          alt="shop"
          width={180}
          height={165}
        />
        <Image
          className="rounded-lg"
          src={`${ImageType === "shop1" ? "/shop-demo2.svg" : "/shop-demo-nagomi2.svg"}`}
          alt="shop2"
          width={180}
          height={165}
        />
      </div>
      <div className="flex items-center gap-1 mr-3">
        <p className="text[4px] mr-1">こだわりのスイーツが楽しめるお店</p>
      </div>
      <div className="flex w-auto  h-[20px] p-1 items-center gap-2 justify-between">
        {ImageType === "shop1" ? (
          <p className="text[7px] text-[#757575]">カフェ</p>
        ) : (
          <p className="text[7px] text-[#757575]">レストラン</p>
        )}
        <div className="flex gap-2">
          <div className="flex gap-2  rounded-full bg-[#f3f3f3] p-1">
            <Image src="/good-icon.svg" alt="good" width={14} height={14} />
            <p className="text[8px] ">1000</p>
          </div>
        </div>
      </div>
    </div>
  );
}
