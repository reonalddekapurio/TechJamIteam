import Link from "next/link";
import Image from "next/image";

import { FooterNavItem } from "@/components/shared/FooterNavItem";
import { ShopCard } from "@/components/shared/ShopCard";

export default function Map() {
  return (
    <>
      <div>
        <div className="flex flex-col items-center mt-4">
          <p className="text-[24px] font-bold text-[#8B4158]">
            運営イチオシマップ
          </p>
          <p className="font-bold">TOP4セレクト</p>
        </div>

        <div className="flex flex-col items-center mt-4">
          <Image src="/map.svg" alt="map" width={350} height={250} />
        </div>

        <div className="max-w-99 bg-[#FFF] h-100">
          <div className="mt-9 border-b-2 border-solid border-[#8B4158]"></div>
          <div className="w-96 overflow-x-scroll mx-auto relative">
            <div className="flex">
              <div className="flex flex-col items-center">
                <ShopCard
                  name="カフェ"
                  genreName="カフェ"
                  image="shop-demo.svg"
                />
                <p className="text-[40px] text-[#F6B741] border-b-2">1</p>
              </div>

              <div className="flex flex-col items-center ">
                <ShopCard
                  name="スシロー"
                  genreName="寿司"
                  image="shop-demo.svg"
                />
                <p className="text-[40px] text-[#F6B741] border-b-2">2</p>
              </div>

              <div className="flex flex-col items-center">
                <ShopCard
                  name="shop1"
                  genreName="カフェ"
                  image="shop-demo.svg"
                />
                <p className="text-[40px] text-[#F6B741] border-b-2">3</p>
              </div>

              <div className="flex flex-col items-center">
                <ShopCard
                  name="shop1"
                  genreName="カフェ"
                  image="shop-demo.svg"
                />
                <p className="text-[40px] text-[#F6B741] border-b-2">4</p>
              </div>
            </div>
          </div>
        </div>

        <FooterNavItem />
      </div>
    </>
  );
}
