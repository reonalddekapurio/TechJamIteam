"use client";

import Link from "next/link";
import Image from "next/image";

type props = {
  name: string;
  genreName: string;
  image: string | null;
};
export function ShopCard({ name, genreName, image }: props) {
  return (
    <div className="min-w-[190px] h-auto p-2  gap-2 rounded-lg ">
      <div>
        <Image
          className="rounded-lg w-[165px] h-[165px]"
          src={`/${image ? image : "/shop-demo.svg"}`}
          alt="shop"
          width={165}
          height={165}
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-[#000000] break-words mt-1.5">{name}</p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-[#757575]">{genreName}</p>
          <div className="flex h-[20px] p-1 items-center gap-1 rounded-lg bg-[#f3f3f3]">
            <div className="gap-3 ">
              <Image src="/good-icon.svg" alt="good" width={14} height={14} />
            </div>
            {/* いいね数はとりあえず固定値で */}
            <p className="text-[10px] ">1000</p>
          </div>
        </div>
      </div>
    </div>
  );
}
