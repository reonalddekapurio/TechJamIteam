import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      console.log("入力項目が不足しています");
      return NextResponse.json(
        { error: "入力項目が不足しています" },
        { status: 400 },
      );
    }

    const supabase = await createClient(); // awaitをつける

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    // ユーザ登録に失敗
    if (error) {
      console.log("supabaseの登録に失敗しました");
      return NextResponse.json(
        { error: error.message }, // supabaseからのエラーメッセージ
        { status: 400 },
      );
    }

    // supabaseの登録に成功
    const userId = data.user?.id; // supabaseに登録したuuidを使用する。
    if (!userId) {
      console.log("ユーザーIDが取得できませんでした");
      return NextResponse.json(
        { error: "ユーザーIDが取得できませんでした" },
        { status: 400 },
      );
    }

    // Userテーブルにユーザー情報を登録する。
    try {
      await db.user.create({
        data: {
          id: userId,
          name,
          email,
          userIcon: null,
        },
      });
      // ユーザー登録に失敗した場合。
    } catch (error) {
      console.log("ユーザー登録に失敗しました");
      // supabaseのユーザーも削除する。
      await supabase.auth.admin.deleteUser(userId);

      return NextResponse.json(
        { error: "ユーザー登録に失敗しました。" },
        { status: 400 },
      );
    }

    // 登録に成功
    return NextResponse.json(
      { message: "ユーザー登録に成功しました" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "サーバーエラーが発生しました。" },
      { status: 500 },
    );
  }
}
