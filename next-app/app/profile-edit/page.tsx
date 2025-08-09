"use client";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import Fetching from "../components/common/Fetching";
import { useRouter } from "next/navigation";
import { FooterNavItem } from "@/components/shared/FooterNavItem";

type FormData = {
  name: string;
  userIcon: File | null;
};

export default function ProfileEdit() {
  const [fetching, setFetching] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [msg, setMsg] = useState<string>("");
  const user = useAuth();
  const router = useRouter();

  // 初期値を設定
  const defaultValues: FormData = {
    name: "",
    userIcon: null,
  };

  // フォームの設定
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({ defaultValues });

  // ユーザー情報は非同期で取得するため、ユーザー情報が読み込まれた後にフォームをリセット
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
      });
      if (user.userIcon) {
        setPreviewUrl(user.userIcon);
      }
      setFetching(false);
    }
  }, [user, reset]);

  // ファイル変更時
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setValue("userIcon", file); // ファイルをフォームに追加
    }
  };

  const onSubmit = (data: FormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    // ファイルが選択されている場合
    if (data.userIcon) {
      formData.append("userIcon", data.userIcon);
    }

    setIsLoading(true);
    fetch("api/user/edit", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200) {
          router.push("/profile");
        }
      })
      .catch((e) => {
        setMsg(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onErrors = (errors: FieldErrors<FormData>) => {
    console.log(errors);
  };

  return fetching ? (
    <Fetching />
  ) : (
    <div className="flex flex-col items-center justify-start h-screen w-full">
      <h2 className="font-bold mt-6 mb-4">プロフィール編集</h2>
      <form
        onSubmit={handleSubmit(onSubmit, onErrors)}
        className="w-full flex flex-col items-center"
      >
        <div>
          <input
            type="file"
            id="userIcon"
            accept=".jpg,.jpeg,.png,.gif"
            hidden={true}
            onChange={handleFileChange}
          />
          {/* プレビュー表示 */}
          {previewUrl && (
            <div className="flex items-center justify-center">
              <label htmlFor="userIcon" className="cursor-pointer relative">
                <img
                  src={previewUrl}
                  alt="プレビュー"
                  className="w-[100px] h-[100px] rounded-full opacity-70"
                />
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-semibold">
                  変更
                </p>
              </label>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center w-full px-4">
          <label
            htmlFor="name"
            className="font-bold text-lg text-left w-full mb-2 mt-4"
          >
            ユーザーネーム
          </label>
          <input
            className="w-full px-2 py-3 border-2 border-black rounded-lg"
            type="text"
            id="name"
            {...register("name", {
              required: "ユーザー名を入力してください",
              maxLength: {
                value: 12,
                message: "ユーザー名は12文字以内で入力してください",
              },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1 text-center">
              {errors.name.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#F6B741] text-white font-bold px-[18.5px] py-[10px] rounded-lg text-center mt-4"
        >
          {isLoading ? "更新中..." : "変更を確定"}
        </button>
        {msg && <p className="text-red-500 text-sm mt-2 text-center">{msg}</p>}
      </form>
      <FooterNavItem />
    </div>
  );
}
