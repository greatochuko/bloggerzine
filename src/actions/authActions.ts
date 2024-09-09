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
  if (data && data[0]) return { errorMessage: "User with email exists!" };

  const signupData = {
    firstname,
    lastname,
    email,
    password: hashedPassword,
  };

  // Create new user
  // const { error } = await supabase.from("users").insert(signupData);

  // if (error) {
  //   return { errorMessage: error.message };
  // }

  const token = jwt.sign({ email }, process.env.JWT_SECRET!);

  sendMail(firstname, email, token);

  revalidatePath("/", "layout");
  redirect("/confirm-email");
}

export async function loginWithGoogle() {}

export async function updateProfile(formData: FormData) {}

export async function updateSocialLinks(formData: FormData) {}

export async function logout() {}

export async function sendResetPasswordEmail() {}

export async function resetPassword(formData: FormData) {}

export async function sendVerificationEmail(formData: FormData) {}
