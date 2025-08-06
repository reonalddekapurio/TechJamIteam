import { db } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      return NextResponse.json(
        { message: error.message }, // 認証エラー
        { status: 401 },
      );
    }

    // ユーザーIDを取得
    const userId = data.user?.id;
    if (!userId) {
      return NextResponse.json(
        { message: "ユーザーIDが取得できませんでした" },
        { status: 400 },
      );
    }

    const userDetail = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
        userIcon: true,
      },
    });

    if (!userDetail) {
      return NextResponse.json(
        { message: "ユーザーが見つかりませんでした" },
        { status: 404 },
      );
    }

    return NextResponse.json(userDetail);
  } catch (error) {
    return NextResponse.json(
      { message: "ユーザー情報の取得に失敗しました" },
      { status: 500 },
    );
  }
}
