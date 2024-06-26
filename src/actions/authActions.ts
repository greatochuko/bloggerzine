"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(initialState: any, formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { user: null, errorMessage: error.message };
  }

  revalidatePath("/dashboard");
  revalidatePath("/create-post");
  revalidatePath("/");
  return { user, errorMessage: null };
}

export async function signup(initialState: any, formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const metaData = {
    firstname: formData.get("firstname") as string,
    lastname: formData.get("lastname") as string,
  };

  const { error } = await supabase.auth.signUp({
    ...data,
    options: { data: metaData },
  });

  if (error) {
    return { errorMessage: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/confirm-email");
}
