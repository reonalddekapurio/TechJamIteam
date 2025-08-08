"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function FooterNavItem() {
  const pathName = usePathname();
  return (
    <footer className=" w-80 h-16  rounded-lg bg-[#FFF] drop-shadow-xl fixed bottom-6 left-1/2 -translate-x-1/2">
      <nav>
        <ul className="flex justify-center items-center gap-10 p-2 h-16">
          <li>
            <Link href="/top">
              <Image
                className={`${pathName === "/top" ? "border-b-[2px] border-[#8B4158] pb-2" : ""}`}
                src="/home-icon.svg"
                alt="home"
                width={30}
                height={26}
              />
            </Link>
          </li>

          <li>
            <Link href="/map">
              <Image
                className={`${pathName === "/map" ? "border-b-[2px] border-[#8B4158] pb-2" : ""}`}
                src="/map-icon.svg"
                alt="map"
                width={30}
                height={26}
              />
            </Link>
          </li>

          <li>
            <Link href="/profile">
              <Image
                className={`${pathName === "/profile" ? "border-b-[2px] border-[#8B4158] pb-2" : ""}`}
                src="/plofile-icon.svg"
                alt="plofile"
                width={30}
                height={26}
              />
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
