"use client";

import Fetching from "@/app/components/common/Fetching";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Genre = {
  id: number;
  name: string;
};

export function SiboriMenu({ onClose }: { onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [fetching, setFetching] = useState<boolean>(true);
  const router = useRouter();

  // マウント時にアニメーション開始
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    fetch("/api/genre/index")
      .then((res) => res.json())
      .then((data) => {
        setGenres(data.genres);
        setFetching(false);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  const handleSubmit = () => {
    if (!selectedGenre) {
      alert("ジャンルが選択されていません。");
    }
    router.push(`/search-results/${selectedGenre}`);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[300px] bg-white shadow-lg pb-4 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex border-b w-full pb-2 pt-1 border-solid border-[#8B4158]">
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // アニメーション後に閉じる
          }}
          className="ml-1 text-[14px]"
        >
          ← 戻る
        </button>
        <p className="flex text-[18px] font-bold justify-center text-[#8B4158] ml-[60px]">
          絞り込み
        </p>
      </div>
      {fetching ? (
        <Fetching />
      ) : (
        <>
          {/* 店舗種類 */}
          <div className="mt-4 border-b border-solid border-[#8B4158]">
            <p className="text-[16px] font-bold text-[#8B4158] ml-2">
              店舗種類
            </p>
            <div className="flex gap-1 m-2 mb-3 justify-center">
              {["カフェ", "レストラン", "居酒屋", "定食"].map((label) => (
                <label key={label} className="text-[#8B4158] text-[14px]">
                  <input type="checkbox" /> {label}
                </label>
              ))}
            </div>
          </div>

          {/* ジャンル */}
          <div className="mt-4 border-b border-solid border-[#8B4158]">
            <p className="text-[16px] font-bold text-[#8B4158] ml-2">
              ジャンル
            </p>
            <div className="grid grid-cols-3 gap-2 m-2 mb-3">
              {genres.map((genre) => (
                <label
                  key={genre.id}
                  className="text-[#8B4158] text-[14px] flex items-center gap-1"
                >
                  <input
                    type="radio"
                    name="subGenre"
                    value={genre.id}
                    checked={selectedGenre === genre.id}
                    onChange={(e) => setSelectedGenre(Number(e.target.value))}
                  />
                  {genre.name}
                </label>
              ))}
            </div>
          </div>

          {/* イチオシ */}
          <div className="mt-4 border-b border-solid border-[#8B4158]">
            <p className="text-[16px] font-bold text-[#8B4158] ml-2">
              イチオシ
            </p>
            <div className="flex gap-2 m-2 mb-3 ml-[15px]">
              <label className="text-[#8B4158] text-[14px]">
                <input type="checkbox" /> 掲載あり
              </label>
            </div>
          </div>
        </>
      )}
      {/* 検索ボタン */}
      <div className="flex justify-center mt-4">
        <button
          className="flex w-[114px] h-[50px] bg-[#8B4158] text-[#FFF] text-[16px] font-bold rounded-lg justify-center items-center"
          disabled={!selectedGenre}
          style={{ backgroundColor: selectedGenre ? "#8B4158" : "gray" }}
          onClick={handleSubmit}
        >
          検索
        </button>
      </div>
    </div>
  );
}
