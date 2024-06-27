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

const users: User[] = [
  {
    id: "e0ef9ea8-a7c1-4cc3-8985-7700b373854c",
    email: "greatochuko123@gmail.com",
    bio: "",
    imageUrl: "/default-profile-image.jpg",
    jobTitle: "",
    lastname: "Ogheneochuko",
    firstname: "Great",
    socialLinks: {
      twitter: "",
      facebook: "",
      linkedIn: "",
      instagram: "",
    },
    coverImageUrl: "/default-cover-image.jpg",
    createdAt: "2024-06-24 23:08:22.820636+00",
  },
];

export function getUsers() {
  return users;
}

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
