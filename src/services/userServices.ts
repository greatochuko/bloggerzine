import { createClient } from "@/utils/supabase/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export type UserType = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  imageUrl: string;
  coverImageUrl: string;
  bio: string;
  jobTitle: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedInUrl: string;
  instagramUrl: string;
  createdAt: string;
  emailVerified: boolean;
};

export async function getUser(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId);

  const user = data ? data[0] : null;

  if (user && !error) return { user, error: null };

  return { user: null, error };
}

export async function getSession(): Promise<UserType | null> {
  const supabase = createClient();
  // Get token from cookies
  const token = cookies().get("token")?.value;
  if (!token) return null;

  // Verify the token
  const payload = jwt.verify(token, process.env.JWT_SECRET!);
  if (typeof payload === "string") return null;

  // Get user from database
  const userId = payload.userId;
  const { data } = await supabase.from("users").select("*").eq("id", userId);
  if (data) return data[0];
  return null;
}
