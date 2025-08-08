"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { SearchBar } from "@/components/shared/SearchBar";
import { ShopCard } from "@/components/shared/ShopCard";
import { FooterNavItem } from "@/components/shared/FooterNavItem";
import { SiboriButton } from "@/components/features/SiboriButton";
import useStores from "@/hooks/useStores";
import Fetching from "../components/common/Fetching";

export default function Top() {
  const [isVisible, setIsVisible] = useState(false);
  const [fetching, setFetching] = useState<boolean>(true);
  const { stores, error } = useStores();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // から配列の時はロード
    if (stores.length > 0) {
      setFetching(false);
    }
  }, [stores]);

  // アニメーション用クラス
  const animationClass = `transition-opacity transition-transform duration-700 ease-out ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }`;

  if (fetching) return <Fetching />;
  if (error) return <div>エラーが発生しました: {error}</div>;

  return (
    <>
      {/* SearchBar と SiboriButton はアニメなし */}
      <div className="flex w-full items-center justify-center fixed top-0 left-0 z-20 gap-1">
        <SearchBar />
        <div>
          <SiboriButton />
        </div>
      </div>

      {/* ふわっとアニメーションをつける部分 */}
      <div
        className={`${animationClass} flex flex-col drop-shadow-xl items-center justify-center pt-20 w-full z-10`}
      >
        <Link href="https://www.city.kakamigahara.lg.jp/">
          <Image
            src="/kakamigahara-pr.svg"
            alt="kakamigahara"
            width={305}
            height={141}
          />
        </Link>
      </div>

      <div className={`${animationClass} flex flex-col items-center`}>
        {/* 1つ目のセクション */}
        <div className="max-w-96">
          <div className="mt-8 border-b-2 border-solid border-[#8B4158]">
            <p className="inline-block text-lg font-bold text-[#8B4158]">
              運営イチオシ
            </p>
          </div>
          <div className="w-96 overflow-x-scroll mx-auto relative">
            <div className="flex">
              {stores.map((store) => (
                <div key={store.id}>
                  <ShopCard
                    name={store.name}
                    genreName={store.genre.name}
                    image={store.storeImage?.[0].path ?? null}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2つ目のセクション */}
        <div className="max-w-96 mt-8">
          <div className="border-b-2 border-solid border-[#8B4158]">
            <p className="inline-block text-lg font-bold text-[#8B4158]">
              近くの店舗
            </p>
          </div>
          <div className="w-96 overflow-x-scroll mx-auto relative">
            <div className="flex">
              {stores.map((store) => (
                <div key={store.id}>
                  <ShopCard
                    name={store.name}
                    genreName={store.genre.name}
                    image={store.storeImage?.[0].path ?? null}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3つ目のセクション */}
        <div className="max-w-96 mt-8">
          <div className="border-b-2 border-solid border-[#8B4158]">
            <p className="inline-block text-lg font-bold text-[#8B4158]">
              運営イチオシ
            </p>
          </div>
          <div className="w-96 overflow-x-scroll mx-auto relative">
            <div className="flex">
              {stores.map((store) => (
                <div key={store.id}>
                  <ShopCard
                    name={store.name}
                    genreName={store.genre.name}
                    image={store.storeImage?.[0].path ?? null}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* フッターはアニメなし */}
      <div className="flex flex-col items-center justify-center fixed bottom-6 left-0 w-full">
        <FooterNavItem />
      </div>
    </>
  );
}
