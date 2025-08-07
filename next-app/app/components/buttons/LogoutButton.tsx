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
    <button className="bg-black text-white" onClick={handleLogout}>
      ログアウト
    </button>
  );
}
