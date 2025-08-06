"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type User = {
  name: string;
  email: string;
  password: string;
};

export default function Confirm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    // セッションストレージからデータを取得
    const storedData = sessionStorage.getItem("registerData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    } else {
      // データがない場合は登録ページにリダイレクト
      router.push("/register");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("ユーザー登録に失敗しました。");
      }

      const data = await res.json();
      console.log(data);

      // データをクリア
      sessionStorage.removeItem("registerData");
      // 成功後の画面へリダイレクト
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/register");
  };

  if (!formData) {
    return <div>読み込み中...</div>;
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="p-4 bg-amber-200 rounded-lg shadow-2xl max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">登録内容の確認</h1>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ユーザー名
              </label>
              <p className="p-4 bg-white rounded-2xl">{formData.name}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                メールアドレス
              </label>
              <p className="p-4 bg-white rounded-2xl">{formData.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                パスワード
              </label>
              <p className="p-4 bg-white rounded-2xl">••••••••</p>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 p-4 bg-gray-500 text-white rounded-2xl hover:bg-gray-600"
            >
              戻る
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 p-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "登録中..." : "登録する"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
