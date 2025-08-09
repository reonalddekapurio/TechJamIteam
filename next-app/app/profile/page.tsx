"use client";
import { useAuth } from "@/hooks/useAuth";
import { FooterNavItem } from "@/components/shared/FooterNavItem";
import LogoutButton from "@/app/components/buttons/LogoutButton";
import Fetching from "../components/common/Fetching";
import ContactButton from "../components/buttons/ContactButton";
import ProfileEditButton from "../components/buttons/ProfileEditButton";
import { ShopCard } from "@/components/shared/ShopCard";

export default function Profile() {
  const user = useAuth();

  // ユーザー情報を取得するまで
  if (!user) return <Fetching />;
  return (
    <div className="flex flex-col items-center justify-between mt-10 w-full">
      <div className="flex flex-col items-center w-full">
        <h2 className="font-bold">プロフィール</h2>
        {user?.userIcon && (
          <img
            src={user.userIcon}
            alt="ユーザーのアイコン"
            className="w-[100px] h-[100px] rounded-full my-3"
          />
        )}
        <h2 className="mb-2">{user?.name}</h2>
        <ProfileEditButton />
        <div className="w-full px-2">
          <h2 className="font-bold text-left mt-4 mb-2">お気に入りリスト</h2>
          <div className="flex items-start space-x-2 overflow-x-auto">
            <ShopCard
              name="カフェドエピ"
              genreName="カフェ"
              image="shop-demo.svg"
            />
            <ShopCard
              name="カフェドエピ"
              genreName="カフェ"
              image="shop-demo.svg"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center  h-auto justify-between">
        <div className="flex flex-col items-center mb-[44px] mt-[28px] space-y-6">
          <ContactButton />
          <LogoutButton />
        </div>
      </div>
      <FooterNavItem />
    </div>
  );
}
