"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export async function login(prevState: any, formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const loginData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data, error } = await supabase.auth.signInWithPassword(loginData);

  if (error) {
    return { data: null, errorMessage: error.message };
  }

  return { data, errorMessage: null };
  // revalidatePath("/", "layout");
  // redirect("/");
}

export async function signup(prevState: any, formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const userMetaData = {
    firstname: formData.get("firstname") as string,
    lastname: formData.get("lastname") as string,
    username: formData.get("username") as string,
    imageUrl: "",
    coverImageUrl: "",
    bio: "",
    jobTitle: "",
    socialLinks: { facebook: "", twitter: "", linkedIn: "" },
  };
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: userMetaData },
  });

  if (error) {
    return { data: null, errorMessage: error.message };
  }

  // revalidatePath("/", "layout");

  redirect("/confirm-email");
  // return { data, errorMessage: null};
}
