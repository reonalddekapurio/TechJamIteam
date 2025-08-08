"use client";

import { useState, useEffect } from "react";

import { SearchBar } from "@/components/shared/SearchBar";
import { SearchShopCard } from "@/components/features/SearchShopCard";
import { FooterNavItem } from "@/components/shared/FooterNavItem";
import { Store } from "@/app/types/store";
import { useParams } from "next/navigation";
import Fetching from "@/app/components/common/Fetching";

export default function SearchResults() {
  const [isVisible, setIsVisible] = useState(false);
  const [stores, setStores] = useState<Store[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);

  const params = useParams<{ id: string }>();
  const genreId = params.id;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    fetch(`/api/store/search/${genreId}`)
      .then((res) => res.json())
      .then((data) => {
        setStores(data.stores);
        setFetching(false);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [genreId]);

  // フェード＆スライドアップ用アニメーションクラス
  const animationClass = `transition-opacity transition-transform duration-700 ease-out ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }`;

  if (fetching) return <Fetching />;

  return (
    <>
      {/* アニメなし部分（検索バー＋タイトル） */}
      <div className="flex flex-col items-center justify-center  gap-4 fixed top-0 left-0 w-full z-20 bg-[#FFFAF1] pb-4">
        <SearchBar />
        <p className="text-lg font-bold text-[#8B4158] border-b-2 border-solid border-[#8B4158]">
          検索結果
        </p>
      </div>

      {/* アニメーションを付ける検索結果一覧 */}
      <div
        className={`${animationClass} flex flex-col items-center justify-center w-full gap-4 pt-32`}
      >
        {stores.map((store) => (
          <SearchShopCard key={store.id} store={store} />
        ))}
      </div>

      {/* フッターもアニメなし */}
      <div className="flex flex-col items-center justify-center fixed bottom-6 left-0 w-full">
        <FooterNavItem />
      </div>
    </>
  );
}
