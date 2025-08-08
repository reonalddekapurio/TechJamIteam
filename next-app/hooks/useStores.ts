"use client";

import { Store } from "@/app/types/store";
import { useEffect, useState } from "react";

export default function useStores() {
  // 店舗一覧情報を取得
  const [stores, setStores] = useState<Store[]>([]);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    fetch("/api/store/index")
      .then((res) => res.json())
      .then((data) => {
        setStores(data.stores);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);

  return { stores, error };
}
