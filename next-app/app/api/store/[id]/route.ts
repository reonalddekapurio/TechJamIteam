import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// 動的ルーティング
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const storeId = parseInt(params.id);
    const store = await db.store.findUnique({
      where: {
        id: storeId,
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
    if (!store) {
      return NextResponse.json(
        { message: "店舗IDが存在しなせん。" },
        { status: 404 },
      );
    }
    return NextResponse.json({ store }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "店舗情報の取得に失敗しました。" },
      { status: 500 },
    );
  }
}
