import { Blogpost } from "@/components/Hero";
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

export async function getCommentsByAuthor(authorId: string) {
  const supabase = createClient();
  const blogposts: Blogpost[] = await getBlogpostByAuthor(authorId);

  const { data, error } = await supabase
    .from("comments")
    .select("*, blogpost(*), user(*)")
    .eq(
      "blogpost",
      blogposts.map((post) => post.id)
    );

  return data || [];
}
