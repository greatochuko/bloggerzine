import { createClient } from "@/utils/supabase/client";

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

  const { data, error } = await supabase
    .from("blogposts")
    .select("*, author(*)")
    .eq("_id", id);

  if (data && data[0]) {
    const updatedViews = data[0].views + 1;
    const { error: updateError } = await supabase
      .from("blogposts")
      .update({ views: updatedViews })
      .eq("_id", id);
  }

  const blogpost = data ? data[0] : null;
  return blogpost;
}

export async function getBlogpostToUpdate(id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("blogposts")
    .select("*, author(*)")
    .eq("_id", id);

  const blogpost = data ? data[0] : null;
  return blogpost;
}

export async function getBlogpostByAuthor(authorId: string, showDraft = false) {
  const supabase = createClient();
  const { data: blogposts } = await supabase
    .from("blogposts")
    .select("*, author(*)")
    .eq("author", authorId)
    .eq("isPublished", !showDraft);
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
