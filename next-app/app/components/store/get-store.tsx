"use client";

import { Store } from "@/app/types/store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Fetching from "@/app/components/common/Fetching";
import { BackButton } from "@/components/features/BackButton";

export default function GetStore() {
  const [store, setStore] = useState<Store | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const param = useParams<{ id: string }>(); // パラメータを取得
  const storeId = param.id;

  useEffect(() => {
    fetch(`/api/store/${storeId}`)
      .then((res) => res.json())
      .then((data) => {
        setStore(data.store);
      })
      .catch((e) => {
        console.error("エラーが発生しました。", e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [storeId]);

  return (
    <div>
      {isLoading ? (
        <Fetching />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-2">
            <BackButton />
            <h2 className="text-[16px] font-bold text-[#8B4158]">{store?.name}</h2>
          </div>
          <div>住所：{store?.address}</div>
          <div>ジャンル：{store?.genre.name}</div>
          <div>画像：{store?.storeImage?.[0].path}</div>
          <div>いいね数：{store?._count.storeLikes}</div>
          <div>サポート数：{store?._count.storeSupports}</div>
        </div>
      )}
    </div>
  );
}
