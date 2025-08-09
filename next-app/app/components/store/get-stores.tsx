"use client";
import { Store } from "@/app/types/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GetStores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("api/store/index")
      .then((res) => res.json())
      .then((data) => {
        setStores(data.stores);
        console.log(data.stores);
      })
      .catch((e) => {
        console.error("エラーが発生しました。", e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {stores.map((store) => (
            <div key={store.id}>
              <div onClick={() => router.push(`/store/${store.id}`)}>
                店名：{store.name}
              </div>
              <div>住所：{store.address}</div>
              <div>ジャンル：{store.genre.name}</div>
              <div>画像：{store.storeImage?.[0].path}</div>
              <div>いいね数：{store._count.storeLikes}</div>
              <div>サポート数：{store._count.storeSupports}</div>
              <div>コメント数：{store._count.comments}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
