import { User } from "@supabase/supabase-js";

export function createAuthorUrl(user: User) {
  return `${user.user_metadata.firstname.toLowerCase()}_${user.user_metadata.lastname.toLowerCase()}_${
    user.id
  }`;
}
