import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

// ジャンル一覧取得
export async function GET() {
  try {
    // all method
    const genres = await db.genre.findMany();
    return NextResponse.json({ genres, message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "ジャンル情報の取得に失敗しました。" },
      { status: 500 },
    );
  }
}
