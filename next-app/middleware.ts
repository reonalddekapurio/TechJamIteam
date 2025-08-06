import { type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  // セッションの更新
  return await updateSession(request);
}

// ミドルウェアのエントリーポイントを設定
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)", // 画像などは適応させない
  ],
};
