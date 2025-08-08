"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    router.push("/login");
  };
  return (
    <button
      className="bg-[#ff0000] text-white px-8 py-2 rounded-[10px] font-bold text-lg"
      onClick={handleLogout}
    >
      ログアウト
    </button>
  );
}
