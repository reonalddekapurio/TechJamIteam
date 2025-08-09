"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Logo from "../components/common/Logo";

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
      router.push("/top");
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
    <main className="pt-10">
      <Logo />
      <span className="flex justify-center items-center">
        <div className="p-4 rounded-lg max-w-md w-full">
          <h1 className="text-base font-bold my-5 text-center">
            {" "}
            新規アカウント登録入力確認
          </h1>

          <form onSubmit={handleSubmit} className="py-2.5">
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-base font-bold text-gray-700 mb-1">
                  <p className="flex items-center px-1 gap-2 pl-3">
                    ユーザー名{" "}
                    <span className="bg-red-500 py-1 px-2 rounded-lg text-white text-sm">
                      必須
                    </span>
                  </p>
                </label>
                <p className="p-4 bg-white rounded-2xl">{formData.name}</p>
              </div>

              <div>
                <label className="block text-base font-bold text-gray-700 mb-1">
                  <p className="flex items-center px-1 gap-2 pl-3">
                    email{" "}
                    <span className="bg-red-500 py-1 px-2 rounded-lg text-white text-sm">
                      必須
                    </span>
                  </p>
                </label>
                <p className="p-4 bg-white rounded-2xl">{formData.email}</p>
              </div>

              <div>
                <label className="block text-base font-bold text-gray-700 mb-1">
                  <p className="flex items-center px-1 gap-2 pl-3">
                    パスワード{" "}
                    <span className="bg-red-500 py-1 px-2 rounded-lg text-white text-sm">
                      必須
                    </span>
                  </p>
                </label>
                <p className="p-4 bg-white rounded-2xl">••••••••</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 p-4 rounded-full bg-rose-800 text-white disabled:opacity-50 focus:ring-2 focus:ring-offset-2 focus:ring-rose-900"
              >
                {isLoading ? "登録中..." : "新規登録"}
              </button>
            </div>
          </form>
        </div>
      </span>
    </main>
  );
}
// もう一度コミットする為
