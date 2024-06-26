"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { createAuthorUrl } from "@/utils/createAuthorUrl";

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

export async function updateProfile(initialState: any, formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const data = {
    firstname: formData.get("firstname") as string,
    lastname: formData.get("lastname") as string,
    bio: formData.get("bio") as string,
    jobTitle: formData.get("job-title") as string,
    imageUrl: formData.get("imageUrl") as string,
    coverImageUrl: formData.get("coverImageUrl") as string,
  };

  const { data: userData, error } = await supabase
    .from("profiles")
    .update(data)
    .eq("id", user.id)
    .select();

  if (error) {
    return { errorMessage: error.message };
  }

  revalidatePath("/settings");
  revalidatePath("/dashboard");
  revalidatePath(`/authors/${createAuthorUrl(userData[0])}`);
  return { errorMessage: null };
}

export async function updateSocialLinks(initialState: any, formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const data = {
    socialLinks: {
      facebook: formData.get("facebook") as string,
      twitter: formData.get("twitter") as string,
      linkedIn: formData.get("linkedIn") as string,
      instagram: formData.get("instagram") as string,
    },
  };

  const { data: userData, error } = await supabase
    .from("profiles")
    .update(data)
    .eq("id", user.id)
    .select();

  if (error) {
    return { errorMessage: error.message };
  }

  revalidatePath("/settings");
  revalidatePath("/dashboard");
  revalidatePath(`/authors/${createAuthorUrl(userData[0])}`);
  return { errorMessage: null };
}
