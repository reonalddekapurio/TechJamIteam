"use client";
import { useAuth } from "@/hooks/useAuth";
import LogoutButton from "@/app/components/buttons/LogoutButton";
import {FooterNavItem} from "@/components/shared/FooterNavItem"
export default function Home() {
  const user = useAuth();
  return (
    <div className="">
      <h2>ログインしているユーザー名{user?.name}</h2>
      <h2>ログインしているメールアドレス{user?.email}</h2>
      <h2>ログインしているユーザーのアイコン{user?.userIcon || "なし"}</h2>
      <LogoutButton />

      <>
                  <FooterNavItem/>
              </>
    </div>
    
  );
}
