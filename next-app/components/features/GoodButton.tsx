"use client";

import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";

export function GoodButton() {
  return (
    <div className="flex items-center justify-center w-[50px] h-[50px] bg-[#FFF] rounded-full border-2 border-solid border-[#8B4158] ">
      <Image src="/good-icon.svg" alt="good" width={25} height={25} />
    </div>
  );
}
