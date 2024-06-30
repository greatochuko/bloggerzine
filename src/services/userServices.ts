import { createClient } from "@/utils/supabase/client";

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  imageUrl: string;
  coverImageUrl: string;
  bio: string;
  jobTitle: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    linkedIn: string;
    instagram: string;
  };
  createdAt: string;
};

export async function getUser(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId);

  const user = data ? data[0] : null;

  if (user && !error) return { user, error: null };

  return { user: null, error };
}
