"use client";

import { Store } from "@/app/types/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Fetching from "@/app/components/common/Fetching";
import { BackButton } from "@/components/features/BackButton";
import Image from "next/image";

export default function GetStore() {
  const [store, setStore] = useState<Store | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const router = useRouter();

  const param = useParams<{ id: string }>();
  const storeId = param.id;

  useEffect(() => {
    fetch(`/api/store/${storeId}`)
      .then((res) => res.json())
      .then((data) => {
        setStore(data.store);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error("エラーが発生しました。", e);
      })
  }, [storeId]);

  if (isLoading) {
    return <Fetching />;
  }

  if (!store) {
    return <div>店舗が見つかりません</div>;
  }

  const storeImages = store.storeImage || [];
  const hasImages = storeImages.length > 0;

  return (
    <div className="flex flex-col items-center w-full p-4 ">
      <div className="flex items-center gap-2 mb-4 w-full space-x-5">
        <button className="text-[16px] font-bold text-[#8B4158]" onClick={() => router.back()}>
          ← 戻る
        </button>
        <h2 className="text-[16px] font-bold text-[#8B4158] ">{store.name}</h2>
      </div>

      {hasImages && (
        <div className="flex flex-col items-center justify-center w-full">
          {/* メイン画像 選択されたものを表示する。 */}
          <div className="mb-4">
            <Image
              src={`/${storeImages[selectedImageIndex].path}`}
              alt={`${store.name}の画像${selectedImageIndex + 1}`}
              width={300}
              height={220}
              className="w-[320px] h-[220px] object-cover rounded-2xl border-2 border-[#8B4158] "
            />
          </div>

          {/* 小さい画像（サムネイル） */}
          <div className="grid grid-cols-4 gap-2 mx-auto pb-4">
            {storeImages.map((image, index) => (
              <div
                key={index}
                // 選択された画像のボーダー変更
                className={`w-12 h-12 cursor-pointer border-2 rounded ${
                  index === selectedImageIndex
                    ? "border-[#8B4158]"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <Image
                  src={`/${image.path}`}
                  alt={`${store.name}の画像${index + 1}`}
                  width={40}
                  height={40}
                  className="w-12 h-12 object-cover rounded justify-start"
                />
              </div>
            ))}
          </div>
        </div>
      )}


      <div className="w-full mb-6 border-t-2 border-[#8B4158] pt-6 flex flex-col space-y-4">
        <div className="flex gap-2">
          <p className="text-[16px] font-bold text-[#8B4158]">住所</p>
          <p className="text-[16px] font-medium text-black">{store.address}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-[16px] font-bold text-[#8B4158]">SNS</p>
          <p className="text-[16px] font-medium text-black">
            <a href={store.link} className="underline text-blue-400 hover:text-blue-600 cursor-pointer">
              {store.link}
            </a>
          </p>
        </div>
        <div className="flex gap-2">
          <p className="text-[16px] font-bold text-[#8B4158]">ジャンル</p>
          <div className="bg-gray-300 px-3 py-1 rounded-full text-center text-sm font-medium">
            {store.genre.name}
          </div>
        </div>
      </div>

    </div>
  );
}
