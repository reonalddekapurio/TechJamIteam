import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// 店舗を10件返す
export async function GET(req:NextRequest) {
  try {
    const stores = await db.store.findMany({
        take : 10,
        include : {
          genre : true, // リレーション
          storeImage : true, // 逆方向だけどこれでいい
          _count : {
            select : {
              storeLikes : true,
              storeSupports : true,
              comments : true,
            }
          }
        },
        orderBy : {
          createdAt : "desc",
        }
      });
      return NextResponse.json(
        {stores},
        {status : 200}
      );
  } catch (error) {
    return NextResponse.json(
      {message : "店舗情報の取得に失敗しました。"},
      {status : 500}
    )
  }
}