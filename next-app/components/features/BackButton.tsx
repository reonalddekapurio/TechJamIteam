"use client";

import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { set } from "react-hook-form";

export function BackButton() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <div className="">
      <button onClick={() => setIsDeleteModalOpen(false)}>← 戻る</button>
    </div>
  );
}
