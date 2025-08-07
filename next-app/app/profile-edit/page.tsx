"use client";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import Fetching from "../components/common/Fetching";
import { useRouter } from "next/navigation";

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
        if(response.status === 200) {
            router.push("/profile");
        }
        setMsg(response.message);
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
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit(onSubmit, onErrors)}>
        <div>
          <label htmlFor="userIcon">アイコン</label>
          <input
            type="file"
            id="userIcon"
            accept=".jpg,.jpeg,.png,.gif"
            hidden={true}
            onChange={handleFileChange}
          />
          {/* プレビュー表示 */}
          {previewUrl && (
            <img
              src={previewUrl}
              alt="プレビュー"
              className="w-20 h-20 rounded-full mt-2"
            />
          )}
        </div>
        <label htmlFor="name">ユーザー名</label>
        <input
          type="text"
          id="name"
          {...register("name", {
            required: true,
            maxLength: {
              value: 12,
              message: "ユーザー名は12文字以内で入力してください",
            },
            minLength: {
              value: 1,
              message: "ユーザー名は1文字以上で入力してください",
            },
          })}
        />
        {errors.name && <p>ユーザー名を入力してください</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "更新中..." : "更新する"}
        </button>
        {msg && <p>{msg}</p>}
      </form>
    </div>
  );
}
