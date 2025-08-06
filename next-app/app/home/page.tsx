"use client";
import { useAuth } from "@/hooks/useAuth";
import LogoutButton from "@/app/components/buttons/LogoutButton";
import { FooterNavItem } from "@/components/shared/FooterNavItem";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import Logo from "../components/common/Logo";

export default function Home() {
  const router = useRouter();

  const handleRegister = useCallback(() => {
    router.push("/register");
  }, [router]);

  const handleLogin = useCallback(() => {
    router.push("/login");
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Logo />
      <div className="flex flex-col items-center gap-4 font-bold [&_button]:w-64 [&_button]:text-center [&_button]:h-12 [&_button]:cursor-pointer">
        <button className="text-black border-2 border-solid border-[#8B4158] p-4 rounded-2xl">
          Googleでログイン
        </button>
        <button
          className="text-black border-2 border-solid border-[#8B4158] p-4 rounded-2xl"
          onClick={handleLogin}
        >
          メールアドレスでログイン
        </button>
        <button
          className="text-white bg-[#8B4158] p-4 rounded-2xl"
          onClick={handleRegister}
        >
          新規ユーザー登録
        </button>
      </div>
    </main>
  );
}
