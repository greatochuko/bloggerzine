import { getBlogpostByAuthor } from "./blogServices";
import { createClient } from "@/utils/supabase/client";

export async function getComments(blogId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("comments")
    .select("*, blogpost(*), user(*)")
    .eq("blogpost", blogId);

  return data || [];
}

export function getCommentsByAuthor(authorId: string) {
  return [];
}
