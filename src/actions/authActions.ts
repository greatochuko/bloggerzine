"use server";

import { signIn } from "@/auth";

export async function login(formData: FormData) {}

export async function signup(formData: FormData) {}

export async function loginWithGoogle() {
  await signIn("google");
}

export async function updateProfile(formData: FormData) {}

export async function updateSocialLinks(formData: FormData) {}

export async function logout() {}

export async function sendResetPasswordEmail() {}

export async function resetPassword(formData: FormData) {}

export async function sendVerificationEmail(formData: FormData) {}
