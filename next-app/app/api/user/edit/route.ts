// ユーザー名を変更するapi
import { db } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // 画像つきはformdataとして受け取る
    const formData = await req.formData();
    const name = formData.get("name") as string; // 文字列として取得
    const userIcon = formData.get("userIcon") as File | null; // nullも許容

    console.log('Received data:', { name, userIcon: userIcon ? 'File exists' : 'No file' });

    // ユーザー情報取得
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    // 認証エラー
    if (error) {
      console.error('Auth error:', error);
      return NextResponse.json(
        { message: error.message },
        { status: 401 },
      );
    }
    
    // ユーザーID取得
    const userId = user?.id;
    // ユーザーIDが取得できない場合
    if (!userId) {
      return NextResponse.json(
        { message: "ユーザーIDが取得できませんでした" },
        { status: 400 });
    }

    // アイコンのパスを指定
    let userIconUrl = null;
    // storageに画像を追加
    if (userIcon) {
      try {
        const originalName = userIcon.name || 'image.jpg';
        const fileName = `${userId}/${Date.now()}_${originalName}`;
        
        const { data, error: uploadError } = await supabase.storage
          .from("image") // バケット名
          .upload(fileName, userIcon); // ファイルのpathを指定する

        if (uploadError) {
          return NextResponse.json(
            { message: `画像のアップロードに失敗しました: ${uploadError.message}` },
            { status: 500 },
          );
        }

        console.log('Upload successful:', data);

        // 画像のURLを取得
        const { data: urlData } = supabase.storage
          .from("image")
          .getPublicUrl(data.path);
        userIconUrl = urlData.publicUrl; // 画像のurlを追加
      } catch (uploadException) {
        return NextResponse.json(
          { message: `画像のアップロードでエラーが発生しました: ${uploadException}` },
          { status: 500 },
        );
      }
    }

    // ユーザー情報を更新
    try {
      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          name,
          ...(userIconUrl && { userIcon: userIconUrl })
        }
      });
    } catch (dbError) {
      return NextResponse.json(
        { message: "データベースの更新に失敗しました" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "ユーザー情報を更新しました。" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "ユーザー情報の更新に失敗しました" },
      { status: 500 },
    );
  }
}