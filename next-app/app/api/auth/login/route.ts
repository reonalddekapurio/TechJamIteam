import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {email , password} = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        {"error" : "入力項目が不足しています。"},
        {status : 400}
      )
    }

    const supabase = await createClient();

    const {data , error} = await supabase.auth.signInWithPassword({
        email,
        password
    })
  }
  catch(e){

  }
}