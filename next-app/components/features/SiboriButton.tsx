"use client";

import Image from "next/image";
import { useState } from "react";
import { SiboriMenu } from "./SiboriMenu";

export function SiboriButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <button
        className="py-3 px-2 bg-[#FFF] border-2 solid border-[#D3D3D3] rounded-full drop-shadow-sm"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Image src="/sibori-icon.svg" alt="sibori" width={21} height={15} />
      </button>

      {isMenuOpen && (
        <div className="fixed top-0 right-0 z-50 bg-white shadow-lg">
          <SiboriMenu onClose={() => setIsMenuOpen(false)} />
        </div>
      )}
    </>
  );
}
