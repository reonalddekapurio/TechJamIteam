"use client";
import { useAuth } from "@/hooks/useAuth";
import { FooterNavItem } from "@/components/shared/FooterNavItem";
import LogoutButton from "@/app/components/buttons/LogoutButton";
import Fetching from "../components/common/Fetching";

export default function Profile() {
  const user = useAuth();

  // ユーザー情報を取得するまで
  if(!user) return <Fetching />
  return (
    <div className="">
      <h2>ログインしているユーザー名{user?.name}</h2>
      <h2>ログインしているメールアドレス{user?.email}</h2>
      {user?.userIcon && <img src={user.userIcon} alt="ユーザーのアイコン" />}
      <LogoutButton />
      <FooterNavItem />
    </div>
  );
}
