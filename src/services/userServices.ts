import { createClient } from "@/utils/supabase/client";

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
