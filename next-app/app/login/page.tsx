'use client';
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "../components/common/Logo";

export default function Login() {
  const [email , setEmail] = useState<string>("");
  const [password , setPassword] = useState<string>("");
  const [isLoading , setIsLoading] = useState<boolean>(false);
  // クライアントからsupabaseにログインをリクエスト
  const router = useRouter();
  const supabase = createClient();

  // ログイン
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
     try {
        const {data , error} = await supabase.auth.signInWithPassword({
            email,
            password
        })
        if(error) {
            throw new Error(error.message);
        }
        router.push('/home');
        setIsLoading(false);
     } catch (error) {
        console.log(error);
     }
     finally {
        setIsLoading(false);
     }
  };


  return (
    <main className="flex flex-col items-center h-screen">
      <div className="my-10">
        <Logo />
      </div>
      <button onClick={() => router.push("/register")}>ユーザー登録</button>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit} className="p-4 bg-yellow-50">
        <h2>メールアドレス</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-4  rounded-2xl"/>
        <h2>パスワード</h2>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-4  rounded-2xl"/>
        <button type="submit" disabled={isLoading} className="p-4 rounded-2xl">
          {isLoading ? "ログイン中..." : "ログイン"}
        </button>
      </form>
    </main>
  )
}