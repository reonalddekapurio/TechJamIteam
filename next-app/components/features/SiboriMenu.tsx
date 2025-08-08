"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function SiboriMenu({ onClose }: { onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  // マウント時にアニメーション開始
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg pb-4 transition-transform duration-300 ease-in-out ${
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

      {/* 店舗種類 */}
      <div className="mt-4 border-b border-solid border-[#8B4158]">
        <p className="text-[16px] font-bold text-[#8B4158]">店舗種類</p>
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
        <p className="text-[16px] font-bold text-[#8B4158]">ジャンル</p>
        <div className="flex gap-1 m-2 mb-3 justify-center">
          {["ラーメン", "パン系", "うどん", "ご飯系"].map((label) => (
            <label key={label} className="text-[#8B4158] text-[14px]">
              <input type="checkbox" /> {label}
            </label>
          ))}
        </div>
      </div>

      {/* イチオシ */}
      <div className="mt-4 border-b border-solid border-[#8B4158]">
        <p className="text-[16px] font-bold text-[#8B4158]">イチオシ</p>
        <div className="flex gap-2 m-2 mb-3 ml-[15px]">
          <label className="text-[#8B4158] text-[14px]">
            <input type="checkbox" /> 掲載あり
          </label>
        </div>
      </div>

      {/* 検索ボタン */}
      <div className="flex justify-center mt-4">
        <Link
          href="/search-results"
          className="flex w-[114px] h-[50px] bg-[#8B4158] text-[#FFF] text-[16px] font-bold rounded-lg justify-center items-center"
        >
          検索
        </Link>
      </div>
    </div>
  );
}
