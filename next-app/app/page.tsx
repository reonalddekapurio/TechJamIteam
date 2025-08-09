"use client";

import { useRouter } from "next/navigation";
import LogoutButton from "@/app/components/buttons/LogoutButton";
import Image from "next/image";
import { useCallback } from "react";
import Logo from "@/app/components/common/Logo";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const user = useAuth();
  return (
    <div className="">
      <h2>ログインしているユーザー名{user?.name}</h2>
      <h2>ログインしているメールアドレス{user?.email}</h2>
      <h2>ログインしているユーザーのアイコン{user?.userIcon || "なし"}</h2>
      <LogoutButton />
    </div>
  );
}
