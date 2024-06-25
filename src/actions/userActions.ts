"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { adminAuthClient } from "@/utils/supabase/adminAuthClient";
import { createAuthorUrl } from "@/utils/createAuthorUrl";

export async function login(prevState: any, formData: FormData) {
  const supabase = createClient();

  const loginData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data, error } = await supabase.auth.signInWithPassword(loginData);

  if (error) {
    return { data: null, errorMessage: error.message };
  }

  revalidatePath("/", "layout");
  return { data, errorMessage: null };
}

export async function signup(prevState: any, formData: FormData) {
  const supabase = createClient();

  const userMetaData = {
    firstname: formData.get("firstname") as string,
    lastname: formData.get("lastname") as string,
    imageUrl: "/placeholder-profile-image.jpg",
    coverImageUrl: "/placeholder-cover-image.jpg",
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

export async function logout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) return;

  revalidatePath("/dashboard");
  revalidatePath("/create-post");
}

export async function updateUser(prevState: any, formData: FormData) {
  const userId = formData.get("userId") as string;
  const userMetaData = {
    firstname: formData.get("firstname") as string,
    lastname: formData.get("lastname") as string,
    imageUrl: formData.get("profile-picture") as string,
    coverImageUrl: formData.get("cover-photo") as string,
    bio: formData.get("bio") as string,
    jobTitle: formData.get("job-title") as string,
  };

  const {
    data: { user },
    error,
  } = await adminAuthClient.updateUserById(userId, {
    user_metadata: userMetaData,
  });

  if (error || !user)
    return { user: null, errorMessage: error?.message || null };

  revalidatePath("/settings");
  revalidatePath(`/authors/${createAuthorUrl(user)}`);
  return { user, errorMessage: null };
}
