"use client";
import { useRouter } from 'next/navigation';
import React from 'react'

const ProfileEditButton = () => {
  const router  = useRouter();
  const handleClick = () => {
    router.push("/profile/edit");
  }
  return (
    <button className="bg-[#8b4158] text-white px-[20px] py-2 rounded-[10px] " onClick={handleClick}>
      プロフィール編集
    </button>
  )
}

export default ProfileEditButton
