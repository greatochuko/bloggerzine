"use server";

import { getUserIdFromCookies } from "@/services/userServices";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function publishPost(formData: FormData) {
  const userId = getUserIdFromCookies();
  if (!userId) return revalidatePath("/", "layout");

  const data = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    category: formData.get("category") as string,
    thumbnail: formData.get("thumbnail") as string,
    tags: formData.get("tags") as string,
    isFeatured: !!(formData.get("isFeatured") as string),
    isPublished: true,
    author: userId,
  };

  const supabase = createClient();
  const { error } = await supabase.from("blogposts").insert(data);

  if (!error) {
    revalidatePath("/", "layout");
    redirect("/dashboard");
  }

  return { errorMessage: error.message };
}

export async function saveAsDraft(formData: FormData) {
  const supabase = createClient();
  const userId = getUserIdFromCookies();
  if (!userId) return revalidatePath("/", "layout");

  const data = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    category: formData.get("category") as string,
    thumbnail: formData.get("thumbnail") as string,
    tags: formData.get("tags") as string,
    isFeatured: !!(formData.get("isFeatured") as string),
    isPublished: false,
    author: userId,
  };

  const { error } = await supabase.from("blogposts").insert(data);

  if (!error) {
    revalidatePath("/", "layout");
    redirect("/dashboard");
  }

  return { errorMessage: error.message };
}

export async function updatePost(formData: FormData) {
  const supabase = createClient();
  const userId = getUserIdFromCookies();
  if (!userId) return revalidatePath("/", "layout");

  const blogId = formData.get("blogId") as string;

  const data = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    category: formData.get("category") as string,
    thumbnail: formData.get("thumbnail") as string,
    tags: formData.get("tags") as string,
    isFeatured: !!(formData.get("isFeatured") as string),
    isPublished: true,
  };

  const { error } = await supabase
    .from("blogposts")
    .update(data)
    .eq("id", blogId)
    .eq("author", userId);

  if (!error) {
    revalidatePath("/", "layout");
    redirect("/dashboard");
  }

  return { errorMessage: error.message };
}

export async function updateAsDraft(formData: FormData) {
  const userId = getUserIdFromCookies();
  if (!userId) return revalidatePath("/", "layout");

  const blogId = formData.get("blogId") as string;

  const data = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    category: formData.get("category") as string,
    thumbnail: formData.get("thumbnail") as string,
    tags: formData.get("tags") as string,
    isFeatured: !!(formData.get("isFeatured") as string),
    isPublished: false,
  };

  const supabase = createClient();
  const { error } = await supabase
    .from("blogposts")
    .update(data)
    .eq("id", blogId)
    .eq("author", userId);

  if (!error) {
    revalidatePath("/", "layout");
    redirect("/dashboard");
  }

  return { errorMessage: error.message };
}

export async function deletePost(formData: FormData) {
  const userId = getUserIdFromCookies();
  if (!userId) {
    revalidatePath("/", "layout");
    return { errorMessage: "User is unauthenticated" };
  }

  const postId = formData.get("postId") as string;

  const supabase = createClient();
  const { error } = await supabase
    .from("blogposts")
    .delete()
    .eq("id", postId)
    .eq("author", userId);

  if (!error) {
    revalidatePath("/", "layout");
  }

  return { errorMessage: error?.message || null };
}

export async function toggleLikePost(blogId: string, authorId: string) {
  const userId = getUserIdFromCookies();
  if (!userId) return revalidatePath("/", "layout");
  const supabase = createClient();
  const { data } = await supabase
    .from("likes")
    .select("*")
    .eq("blogpost", blogId)
    .eq("user", userId);

  if (data?.length) {
    await supabase
      .from("likes")
      .delete()
      .eq("blogpost", blogId)
      .eq("user", userId);
  } else {
    await supabase
      .from("likes")
      .insert({ author: authorId, blogpost: blogId, user: userId });
  }

  revalidatePath("/blog/[blogTitle]", "page");
  revalidatePath("/dashboard");
}
