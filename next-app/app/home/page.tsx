"use client";
import { useAuth } from "@/hooks/useAuth";
import LogoutButton from "../components/buttons/LogoutButton";

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
