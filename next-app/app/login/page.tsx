import Logo from "../components/common/Logo";
import UserLogin from "../components/forms/user-login";

export default function Login() {
  return (
    <main className="flex flex-col items-center h-screen">
      <div className="mt-10">
        <Logo />
      </div>
      <UserLogin />
    </main>
  );
}
