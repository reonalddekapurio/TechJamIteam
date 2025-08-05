"use client";
import { useRouter } from "next/navigation";
import { useState } from "react"

// ユーザー登録(クライアントコンポーネント)
export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  // ユーザー登録
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register" , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        })
        });

        if(!res.ok) {
          throw new Error("ユーザー登録に失敗しました。");
        }

        const data = await res.json();
        console.log(data);

        router.push("/");
    } catch (error) {
        console.log(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <form action="" className="p-4 bg-amber-200 rounded-lg shadow-2xl" onSubmit={handleSubmit}>
        <h1>ユーザー名</h1>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="p-4 bg-white rounded-2xl"/>
        <h1>メールアドレス</h1>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-4 bg-white rounded-2xl"/>
        <h1>パスワード(6文字以上)</h1>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-4 bg-white rounded-2xl"/>
        <br />
        <button type="submit"  disabled={isLoading} className="p-4 bg-white rounded-2xl">
          {isLoading ? "登録中..." : "登録"}
        </button>
      </form>
    </main>
  )
}