"use client";

import { useRouter } from "next/navigation";
import { FieldErrors, useForm } from "react-hook-form";
import Logo from "../common/Logo";
import { useState } from "react";


type User = {
  name: string;
  email: string;
  password: string;
};

export default function UserRegister() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = (data: User) => {
    // セッションストレージにデータを保存
    sessionStorage.setItem("registerData", JSON.stringify(data));
    router.push("/confirm");
  };

  const onErrors = (errors: FieldErrors<User>) => {
    console.log(errors);
  };

  const email = watch("email");
  const password = watch("password");
  
  const [isLoading, setIsLoading] = useState(false); // ← これ追加

  const isDisabled = isLoading || !email || !password || Object.keys(errors).length > 0;

  return (
    <div className="p-4 rounded-lg w-[100%] mt-10">
      <Logo />
      <h1 className="text-center p-8 text-xl font-bold mb-6">新規アカウント登録</h1>

      <form onSubmit={handleSubmit(onSubmit, onErrors)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-bold mb-2">
          <p className="flex items-center px-1 gap-2">ユーザー名<span className="bg-red-500 py-1 px-2 rounded-lg text-white text-sm">必須</span></p>
          </label>
          <input
            type="text"
            {...register("name", {
              required: "ユーザー名は必須です",
            })}
            className="p-4 bg-white rounded-2xl w-full border border-gray-400"
            id="name"
            placeholder="ユーザー名を入力" 
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold mb-2">
          <p className="flex items-center px-1 gap-2">email <span className="bg-red-500 py-1 px-2 rounded-lg text-white text-sm">必須</span></p>
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "メールアドレスは必須です",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "メールアドレスの形式が不正です",
              },
            })}
            className="p-4 bg-white rounded-2xl w-full border border-gray-400"
            placeholder="メールアドレスを入力" 
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-bold mb-2">
            <p className="flex items-center px-1 gap-2">パスワード <span className="bg-red-500 py-1 px-2 rounded-lg text-white text-sm">必須</span></p>
          </label>
          <input
            type="password"
            {...register("password", {
              required: "パスワードは必須です",
              minLength: {
                value: 8,
                message: "パスワードは8文字以上で入力してください",
              },
            })}
            className="p-4 bg-white rounded-2xl w-full border border-gray-400"
            placeholder="8桁以上のパスワード" 
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex space-x-4">
          
        <button
          type="submit"
          disabled={isDisabled || isLoading}
          className={`w-full py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold
          ${isDisabled ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-rose-800 text-white"}
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-900
          transition-colors`}
          >
            {isLoading ? "確認中..." : "入力確認"}
        </button>
        </div>
      </form>
    </div>
  );
}
