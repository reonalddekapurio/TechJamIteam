"use client";

import { Store } from "@/app/types/store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function GetStore(){
  const [store , setStore ] = useState<Store | null>(null);
  const [isLoading , setIsLoading ] = useState<boolean>(true);

  const param = useParams<{id : string}>(); // パラメータを取得
  const storeId = param.id;

  useEffect(() => {
    fetch(`/api/store/${storeId}`)
    .then(res => res.json())
    .then(data => {
        setStore(data.store);
    })
    .catch(e => {
        console.error("エラーが発生しました。", e);
    })
    .finally(() => {
        setIsLoading(false);
    })
  },[storeId]);

  return (
    <div>
        {isLoading ? (
            <div>Loading...</div>
        ) : (
            <div>
                <div>店名：{store?.name}</div>
                <div>住所：{store?.address}</div>
                <div>ジャンル：{store?.genre.name}</div>
                <div>画像：{store?.storeImage?.path}</div>
                <div>いいね数：{store?._count.storeLikes}</div>
                <div>サポート数：{store?._count.storeSupports}</div>
            </div>
        )}
    </div>
  )
}