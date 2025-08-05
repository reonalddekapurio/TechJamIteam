"use client";

import { useEffect , useState } from "react"

interface User {
  name : string;
  email : string;
  userIcon : string | null;
}
// ログインしているユーザーの情報を取得するフック
export function useAuth() {
  const [user , setUser ] = useState<User | null>(null);
  useEffect(() => {
    fetch("/api/user/show")
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        console.log(`error : ${data.message}`);
        return;
      }
      setUser(data); // ユーザーの情報取得
      console.log(data);
    })
  },[]);
  return user;
}