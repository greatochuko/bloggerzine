"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
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

export async function signup(formData: FormData) {
  const supabase = createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstname = formData.get("firstname") as string;
  const lastname = formData.get("lastname") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { firstname, lastname } },
  });

  if (error) {
    return { user: null, errorMessage: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/confirm-email");
}
