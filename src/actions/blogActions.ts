"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function publishPost(formData: FormData) {
  const supabase = createClient();

  const data = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    category: formData.get("category") as string,
    thumbnail: formData.get("thumbnail") as string,
    tags: formData.get("tags") as string,
    isFeatured: formData.get("isFeatured") as string,
    isPublished: true,
  };

  const { error } = await supabase.from("blogposts").insert(data);

  if (!error) {
    revalidatePath("/dashboard");
    revalidatePath("/");
    revalidatePath("/authors/[userSlug]", "page");
    redirect("/dashboard");
  }

  return { errorMessage: error.message };
}

export async function saveAsDraft(formData: FormData) {
  const supabase = createClient();

  const data = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    category: formData.get("category") as string,
    thumbnail: formData.get("thumbnail") as string,
    tags: formData.get("tags") as string,
    isFeatured: formData.get("isFeatured") as string,
    isPublished: false,
  };

  const { error } = await supabase.from("blogposts").insert(data);

  if (!error) {
    revalidatePath("/dashboard");
    revalidatePath("/");
    revalidatePath("/authors/[userSlug]", "page");
    redirect("/dashboard");
  }

  return { errorMessage: error.message };
}

export async function updatePost(formData: FormData) {
  const supabase = createClient();

  const blogId = formData.get("blogId") as string;

  const data = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    category: formData.get("category") as string,
    thumbnail: formData.get("thumbnail") as string,
    tags: formData.get("tags") as string,
    isFeatured: formData.get("isFeatured") as string,
    isPublished: true,
  };

  const { error } = await supabase
    .from("blogposts")
    .update(data)
    .eq("_id", blogId);

  if (!error) {
    revalidatePath("/dashboard");
    revalidatePath("/");
    revalidatePath("/authors/[userSlug]", "page");
    revalidatePath("/blog/[blogTitle]", "page");
    redirect("/dashboard");
  }

  return { errorMessage: error.message };
}

export async function updateAsDraft(formData: FormData) {
  const supabase = createClient();

  const blogId = formData.get("blogId") as string;

  const data = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    category: formData.get("category") as string,
    thumbnail: formData.get("thumbnail") as string,
    tags: formData.get("tags") as string,
    isFeatured: formData.get("isFeatured") as string,
    isPublished: false,
  };

  const { error } = await supabase
    .from("blogposts")
    .update(data)
    .eq("_id", blogId);

  if (!error) {
    revalidatePath("/dashboard");
    revalidatePath("/");
    revalidatePath("/authors/[userSlug]", "page");
    revalidatePath("/blog/[blogTitle]", "page");
    redirect("/dashboard");
  }

  return { errorMessage: error.message };
}

export async function deletePost(initialState: any, formData: FormData) {
  const supabase = createClient();

  const postId = formData.get("postId") as string;

  const { error } = await supabase.from("blogposts").delete().eq("_id", postId);

  if (!error) {
    revalidatePath("/");
    revalidatePath("/search");
    revalidatePath("/dashboard");
    revalidatePath("/authors/[userSlug]", "page");
  }

  return { done: true, error: error?.message || null };
}
