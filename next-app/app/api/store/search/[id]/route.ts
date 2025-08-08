import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  // 選択されたジャンルIDを取得
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json(
      { message: "ジャンルIDが不正です。" },
      { status: 400 },
    );
  }
  try {
    const stores = await db.store.findMany({
      where: {
        genreId: id,
      },
      include: {
        genre: true,
        storeImage: true,
        comments: true,
        _count: {
          select: {
            storeLikes: true,
            storeSupports: true,
          },
        },
      },
    });

    return NextResponse.json({ stores, message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "店舗検索に失敗しました。" },
      { status: 500 },
    );
  }
}
