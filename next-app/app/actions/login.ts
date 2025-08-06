"use server";
import { createClient } from "@/utils/supabase/server";
import { Input } from "../components/forms/user-login";

export async function login(input:Input) : Promise<void> {
    const supabase = await createClient();
    const {data , error} = await supabase.auth.signInWithPassword({
      email : input.email,
      password : input.password
    })
    if(error){
      throw new Error(error.message);
    }
}