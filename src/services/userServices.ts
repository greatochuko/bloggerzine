import { adminAuthClient } from "@/utils/supabase/adminAuthClient";
import { User } from "@supabase/supabase-js";

const users: User[] = [
  {
    id: "e0ef9ea8-a7c1-4cc3-8985-7700b373854c",
    aud: "authenticated",
    role: "authenticated",
    email: "greatochuko123@gmail.com",
    email_confirmed_at: "2024-06-24 23:08:49.274474+00",
    confirmation_sent_at: "2024-06-24 23:08:22.82792+00",
    last_sign_in_at: "2024-06-24 23:08:49.276963+00",
    app_metadata: {
      provider: "email",
      providers: ["email"],
    },
    user_metadata: {
      bio: "",
      sub: "e0ef9ea8-a7c1-4cc3-8985-7700b373854c",
      email: "greatochuko123@gmail.com",
      imageUrl: "/placeholder-profile-image.jpg",
      jobTitle: "",
      lastname: "Ogheneochuko",
      username: "greatochuko",
      firstname: "Great",
      socialLinks: {
        twitter: "",
        facebook: "",
        linkedIn: "",
      },
      coverImageUrl: "/placeholder-cover-image.jpg",
      email_verified: false,
      phone_verified: false,
    },
    created_at: "2024-06-24 23:08:22.820636+00",
    updated_at: "2024-06-24 23:08:49.281203+00",
    confirmed_at: "2024-06-24 23:08:49.274474+00",
    is_anonymous: false,
  },
];

export function getUsers() {
  return users;
}

export async function getUser(userId: string) {
  const {
    data: { user },
    error,
  } = await adminAuthClient.getUserById(userId);

  if (user && !error) return { author: user, error: null };

  return { author: null, error };
}

export function getUserDashboard() {
  return users[0];
}
