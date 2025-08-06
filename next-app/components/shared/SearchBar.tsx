"use client";

import Link from "next/link";
import Image from "next/image";

export function SearchBar() {
  return (
    <div className="flex w-72 h-10 p-2 items-center gap-2 border-2 border-solid border-[#D3D3D3] rounded-full">
      <Image src="/search-icon.svg" 
      alt="search" 
      width={16} 
      height={17} />
      <input type="text"  placeholder="キーワードで検索" className="w-72 h-10 outline-none"/>
    </div>
  )
}
