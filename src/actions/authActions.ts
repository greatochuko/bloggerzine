"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { sendMail } from "@/utils/sendMail";
import jwt from "jsonwebtoken";

export async function login(formData: FormData) {}

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

export async function updateProfile(formData: FormData) {}

export async function updateSocialLinks(formData: FormData) {}

export async function logout() {}

export async function sendResetPasswordEmail() {}

export async function resetPassword(formData: FormData) {}

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
