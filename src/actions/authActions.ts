"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { sendMail, sendPasswordMail } from "@/utils/sendMail";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import {
  getSession,
  getUserIdFromCookies,
  UserType,
} from "@/services/userServices";

export async function login(initialState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectTo = (formData.get("redirectTo") as string) || "/";

  const supabase = createClient();
  const { data }: { data: UserType[] | null } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);
  if (!data)
    return {
      errorMessage:
        "Invalid email or password. Please check your credentials and try again.",
    };

  if (!data[0].emailVerified) {
    const formData = new FormData();
    formData.set("email", data[0].email);
    formData.set("firstname", data[0].firstname);
    await sendVerificationEmail(formData);
    return {
      errorMessage: "User email unverified.",
    };
  }

  const passwordIsCorrect = await bcrypt.compare(password, data[0].password);
  if (!passwordIsCorrect)
    return {
      errorMessage:
        "Invalid email or password. Please check your credentials and try again.",
    };

  const token = jwt.sign(
    {
      userId: data[0].id,
    },
    process.env.JWT_SECRET!
  );

  cookies().set("token", token, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
  });

  revalidatePath("/", "layout");
  redirect(redirectTo);
}

export async function signup(initialState: any, formData: FormData) {
  const supabase = createClient();

  const firstname = formData.get("firstname") as string;
  const lastname = formData.get("lastname") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if user exists
  const { data } = await supabase.from("users").select("*").eq("email", email);

  if (data && data[0])
    return {
      errorMessage:
        "An account with this email address already exists. Please use a different email or log in to your existing account.",
    };

  const signupData = {
    firstname,
    lastname,
    email,
    password: hashedPassword,
  };

  // Create new user
  const { error: signupError } = await supabase
    .from("users")
    .insert(signupData);

  if (signupError) {
    return { errorMessage: signupError.message };
  }

  const token = jwt.sign(
    {
      email,
      firstname,
    },
    process.env.JWT_SECRET!
  );
  const emailToken = jwt.sign(
    {
      email,
      firstname,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  const { done, error } = await sendMail(firstname, email, token, emailToken);

  if (done) {
    revalidatePath("/", "layout");
    redirect(`/confirm-email?token=${token}`);
  }

  return { errorMessage: error };
}

export async function loginWithGoogle() {}

export async function updateProfile(formData: FormData) {
  const updateData = {
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    imageUrl: formData.get("imageUrl"),
    coverImageUrl: formData.get("coverImageUrl"),
    jobTitle: formData.get("jobTitle"),
    bio: formData.get("bio"),
  };

  const userId = getUserIdFromCookies();
  if (!userId) return revalidatePath("/", "layout");

  const supabase = createClient();
  await supabase.from("users").update(updateData).eq("id", userId);
  revalidatePath("/", "layout");
}

export async function updateSocialLinks(formData: FormData) {
  const updateData = {
    facebookUrl: formData.get("facebook"),
    twitterUrl: formData.get("twitter"),
    instagramUrl: formData.get("instagram"),
    linkedInUrl: formData.get("linkedIn"),
  };

  const userId = getUserIdFromCookies();
  if (!userId) return revalidatePath("/", "layout");

  const supabase = createClient();
  await supabase.from("users").update(updateData).eq("id", userId);
  revalidatePath("/", "layout");
}

export async function logout() {
  cookies().delete("token");
  revalidatePath("/", "layout");
}

export async function sendResetPasswordEmail() {
  const user = await getSession();
  if (!user) return revalidatePath("/", "layout");

  const token = jwt.sign(
    {
      email: user.email,
      firstname: user.firstname,
    },
    process.env.JWT_SECRET!
  );

  const emailToken = jwt.sign(
    {
      email: user.email,
      firstname: user.firstname,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  await sendPasswordMail(user.firstname, user.email, token, emailToken);
}

export async function resetPassword(formData: FormData) {
  const newPassword = formData.get("newPassword") as string;
  const email = formData.get("email");

  const encryptedPassword = await bcrypt.hash(newPassword, 10);

  const supabase = createClient();
  const { error } = await supabase
    .from("users")
    .update({ password: encryptedPassword })
    .eq("email", email);

  if (error) return { done: false, errorMessage: error.message };

  revalidatePath("/", "layout");
  redirect("/");
}

export async function sendVerificationEmail(formData: FormData) {
  const email = formData.get("email") as string;
  const firstname = formData.get("firstname") as string;

  const token = jwt.sign(
    {
      email,
      firstname,
    },
    process.env.JWT_SECRET!
  );
  const emailToken = jwt.sign(
    {
      email,
      firstname,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  const { done } = await sendMail(firstname, email, token, emailToken);

  if (done) {
    revalidatePath("/", "layout");
    redirect(`/confirm-email?token=${token}`);
  }
}
