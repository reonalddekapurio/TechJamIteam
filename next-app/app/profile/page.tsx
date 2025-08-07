import { useAuth } from "@/hooks/useAuth";
import { FooterNavItem } from "@/components/shared/FooterNavItem";
import LogoutButton from "@/app/components/buttons/LogoutButton";

export default function Plofile() {
    const user = useAuth();
    return (
      <div className="">
        <h2>ログインしているユーザー名{user?.name}</h2>
        <h2>ログインしているメールアドレス{user?.email}</h2>
        <h2>ログインしているユーザーのアイコン{user?.userIcon || "なし"}</h2>
        <LogoutButton />
        <FooterNavItem />
      </div>
    );
}           