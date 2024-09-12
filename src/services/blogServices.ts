import { createClient } from "@/utils/supabase/client";
import { getUserIdFromCookies } from "./userServices";
import { revalidatePath } from "next/cache";

export type LikeType = {
  id: string;
  user: string;
  author: string;
  blogpost: string;
  createdAt: string;
};

export async function getBlogposts() {
  const supabase = createClient();
  const { data: blogposts, error } = await supabase
    .from("blogposts")
    .select("*, author(*)")
    .eq("isPublished", true);
  return blogposts || [];
}

export async function getBlogpost(id: string) {
  const supabase = createClient();

  const { data } = await supabase
    .from("blogposts")
    .select("*, author(*)")
    .eq("id", id);

  if (data && data[0]) {
    const updatedViews = data[0].views + 1;
    const { error: updateError } = await supabase
      .from("blogposts")
      .update({ views: updatedViews })
      .eq("id", id);
  }

  const blogpost = data ? data[0] : null;
  return blogpost;
}

export async function getBlogpostToUpdate(id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("blogposts")
    .select("*, author(*)")
    .eq("id", id);

  const blogpost = data ? data[0] : null;
  return blogpost;
}

export async function getBlogpostByAuthor(authorId: string, showDraft = false) {
  const supabase = createClient();
  const { data: blogposts, error } = showDraft
    ? await supabase
        .from("blogposts")
        .select("*, author(*)")
        .eq("author", authorId)
    : await supabase
        .from("blogposts")
        .select("*, author(*)")
        .eq("author", authorId)
        .eq("isPublished", true);
  return blogposts || [];
}

export async function getBlogpostByCategory(category: string) {
  const supabase = createClient();
  const { data: blogposts } = await supabase
    .from("blogposts")
    .select("*, author(*)")
    .ilike("category", category)
    .eq("isPublished", true);
  return blogposts || [];
}

export async function searchBlog(query: string) {
  const supabase = createClient();
  const { data: blogposts } = await supabase
    .from("blogposts")
    .select("*, author(*)")
    .ilikeAnyOf(
      "tags, title",
      query.split("-").map((q) => `%${q}%`)
    )
    .eq("isPublished", true);
  return blogposts || [];
}

export async function getSimilarPosts(query: string) {
  const supabase = createClient();
  const { data: blogposts } = await supabase
    .from("blogposts")
    .select("*, author(*)")
    .ilikeAnyOf(
      "tags, title",
      query.split(" ").map((q) => `%${q}%`)
    )
    .eq("isPublished", true);
  return blogposts || [];
}

export async function getBlogpostIsLiked(blogpostId: string): Promise<boolean> {
  const userId = getUserIdFromCookies();
  if (!userId) revalidatePath("/", "layout");

  const supabase = createClient();
  const { data, error } = await supabase
    .from("likes")
    .select("*")
    .eq("blogpost", blogpostId)
    .eq("user", userId);

  const blogpostIsLiked = !!data?.length;

  if (error) return false;

  return blogpostIsLiked;
}

export async function getLikedBlogposts() {
  const userId = getUserIdFromCookies();
  if (!userId) {
    revalidatePath("/", "layout");
    return [];
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("likes")
    .select("*")
    .eq("author", userId);

  if (error) return [];

  return data;
}
