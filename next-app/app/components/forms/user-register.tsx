"use client";

import { useRouter } from "next/navigation";
import { FieldErrors, useForm } from "react-hook-form";

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

  return (
    <div className="p-4 bg-amber-200 rounded-lg shadow-2xl">
      <h1 className="text-2xl font-bold mb-6">ユーザー登録</h1>

      <form onSubmit={handleSubmit(onSubmit, onErrors)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            ユーザー名
          </label>
          <input
            type="text"
            {...register("name", {
              required: "ユーザー名は必須です",
              maxLength : {
                value : 12 ,
                message : "ユーザー名は12文字以内で入力してください",
              },
              minLength : {
                value : 1,
                message : "ユーザー名は1文字以上で入力してください",
              },
            })}
            className="p-4 bg-white rounded-2xl w-full"
            id="name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            メールアドレス
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
            className="p-4 bg-white rounded-2xl w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            パスワード
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
            className="p-4 bg-white rounded-2xl w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="flex-1 p-4 bg-gray-500 text-white rounded-2xl hover:bg-gray-600"
          >
            ログイン画面へ
          </button>
          <button
            type="submit"
            className="flex-1 p-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700"
          >
            確認画面へ
          </button>
        </div>
      </form>
    </div>
  );
}
