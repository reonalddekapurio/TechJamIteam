import Image from "next/image";

export function Logo() {
  return (
    <div className="flex justify-center items-center gap-4 mt-10">
      <div>
        <Image src="/logo.png" alt="logo" width={32} height={160} />
      </div>
      <div>
        <Image src="/text.png" alt="text" width={160} height={160} />
      </div>
    </div>
  );
}

export default Logo;
