"use client";

import Link from "next/link";
import Image from "next/image";

export function ShopCard() {
    return (
            <div className="w-[190px] h-auto p-2  gap-2 rounded-lg">
                <div>
                <Image className="rounded-lg"
                    src="/shop-demo.svg"
                    alt="shop"
                    width={165}
                    height={165}

                />
                </div>
                    <div className="flex items-center gap-1">
                        <p className="text[11px]">カフェドエピ</p>
                            <div className="flex w-auto  h-[20px] p-1 items-center gap-2  rounded-lg bg-[#f3f3f3]">
                                <div className="gap-3 ">
                                    <Image
                                        src="/good-icon.svg"
                                        alt="good"
                                        width={14}
                                        height={14}
                                    />
                                </div>
                                <p className="text[10px] ">1000</p>
                            </div>
                    </div>
                    <p className=" text-xs text-[#757575]">カフェ</p>
        </div>
    )
}