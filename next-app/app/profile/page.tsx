"use client";
import { useAuth } from "@/hooks/useAuth";
import { FooterNavItem } from "@/components/shared/FooterNavItem";
import LogoutButton from "@/app/components/buttons/LogoutButton";
import Image from "next/image";

export default function Profile() {
  const user = useAuth();
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
