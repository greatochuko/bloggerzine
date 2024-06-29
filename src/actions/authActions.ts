"use server";
import jwt from "jsonwebtoken";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(initialState: any, formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return {
      errorMessage: error.message,
      redirectTo: initialState.redirectTo,
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/create-post");
  revalidatePath("/");
  revalidatePath("/login");
  redirect(initialState.redirectTo || `/`);
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
    options: { data: metaData, emailRedirectTo: "http://localhost:3000/login" },
  });

  if (error) {
    return { errorMessage: error.message };
  }

  revalidatePath("/", "layout");

  const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET!;
  const token = jwt.sign({ email: data.email }, jwtSecret);
  redirect(`/confirm-email?token=${token}`);
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
  revalidatePath(`/authors/[userSlug]`, "page");
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

  const { error } = await supabase
    .from("profiles")
    .update(data)
    .eq("id", user.id)
    .select();

  if (error) {
    return { errorMessage: error.message };
  }

  revalidatePath("/settings");
  revalidatePath("/dashboard");
  revalidatePath("/authors/[userSlug]", "page");
  return { errorMessage: null };
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();

  revalidatePath("/settings");
  revalidatePath("/dashboard");
  revalidatePath("/create-post");
  revalidatePath("/edit-post/[blogId]", "page");
  redirect("/login");
}

export async function sendResetPasswordEmail(initialState: any) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data, error } = await supabase.auth.resetPasswordForEmail(
    user.email as string,
    {
      redirectTo: "http://localhost:3000/account/update-password",
    }
  );

  return {
    data,
    errorMessage: error ? "An error occured please try again later" : null,
  };
}

export async function resetPassword(initialState: any, formData: FormData) {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return { errorMessage: error.message };
  }

  redirect("/");
}

export async function sendVerificationEmail(formData: FormData) {
  const supabase = createClient();
  const email = formData.get("email") as string;

  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: "http://localhost:3000/login",
    },
  });

  return { errorMessage: error ? error.message : null };
}
