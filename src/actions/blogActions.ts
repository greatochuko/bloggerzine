"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function publishPost(initialState: any, formData: FormData) {
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

  const { data: blogposts, error } = await supabase
    .from("blogposts")
    .insert(data);

  if (!error) {
    revalidatePath("/dashboard");
    revalidatePath("/");
    revalidateTag("/authors");
    redirect("/dashboard");
  }

  return { errorMessage: error.message };
}

export async function saveAsDraft(initialState: any, formData: FormData) {
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

  const { data: blogposts, error } = await supabase
    .from("blogposts")
    .insert(data);

  if (!error) {
    revalidatePath("/dashboard");
    revalidatePath("/");
    revalidateTag("/authors");
    redirect("/dashboard");
  }

  return { errorMessage: error.message };
}

export async function deletePost(initialState: any, formData: FormData) {
  const supabase = createClient();

  const postId = formData.get("postId") as string;

  const { error } = await supabase.from("blogposts").delete().eq("id", postId);

  if (!error) {
    revalidatePath("/");
    revalidatePath("/search");
    revalidatePath("/dashboard");
    revalidateTag("/authors");
  }

  return { error: error?.message || null };
}
