"use client";

import { login } from "@/app/actions/login";
import { createClient } from "@/utils/supabase/server";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

export type Input = {
  email: string;
  password: string;
};

export default function UserLogin() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("ログイン");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit = async (data: Input) => {
    try {
      setIsLoading(true);
      setMsg("ログイン中...");
      await login(data);
      router.push("/top");
    } catch (error) {
      setMsg("ログインに失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  const onErrors = (errors: FieldErrors<Input>) => {
    console.log(errors);
  };

  const email = watch("email");
  const password = watch("password");

  const isDisabled =
    isLoading || !email || !password || Object.keys(errors).length > 0;

  return (
    <div className="flex justify-center w-[105%] items-center bg-gray-50">
      <div className="w-full p-8 bg-white rounded-lg">
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-gray-900 mb-2">{msg}</h1>
          {/* <p className="text-gray-600">アカウントにログインしてください</p> */}
        </div>

        <form onSubmit={handleSubmit(onSubmit, onErrors)} className="space-y-6">
          <div className="mb-10">
            <label className="flex items-center font-semibold text-gray-700 mb-2">
              <p className="flex items-center px-1 gap-2">
                メールアドレス
                <span className="bg-red-500 py-1 px-2 rounded-lg text-white text-sm">
                  必須
                </span>
              </p>
            </label>
            <input
              id="email"
              type="email"
              placeholder="メールアドレスを入力"
              {...register("email", {
                required: "メールアドレスは必須です",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "メールアドレスの形式が不正です",
                },
              })}
              className="w-full px-4 py-3 border border-black-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-15">
            <label
              htmlFor="password"
              className="flex items-center font-semibold text-gray-700 mb-2"
            >
              <p className="flex items-center px-1 gap-2">
                パスワード{" "}
                <span className="bg-red-500 py-1 px-2 rounded-lg text-white text-sm">
                  必須
                </span>
              </p>
            </label>
            <input
              type="password"
              id="password"
              placeholder="パスワードを入力"
              {...register("password", {
                required: "パスワードは必須です",
                minLength: {
                  value: 8,
                  message: "パスワードは8文字以上で入力してください",
                },
              })}
              className="w-full px-4 py-3 border border-black-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isDisabled || isLoading}
            className={`w-full py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold
          ${isDisabled ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-rose-800 text-white"}
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-900
          transition-colors`}
          >
            {isLoading ? "ログイン中..." : "ログイン"}
          </button>
        </form>
      </div>
    </div>
  );
}
