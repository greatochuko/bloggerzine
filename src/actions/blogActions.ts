"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function publishPost( formData: FormData) {
  const supabase = createClient();
  const newBlogpost = {
    title: formData.get("title"),
    content: formData.get("content"),
    thumbnail: formData.get("thumbnail"),
    tags: formData.get("tags"),
    category: formData.get("category"),
    isFeatured: formData.get("isFeatured"),
    isPublished: true,
  };
  const { error } = await supabase
    .from("blogposts")
    .insert(newBlogpost)
    .select("*");

  if (error) return { data: null, errorMessage: error.message };

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function savePostAsDraft( formData: FormData) {
  const supabase = createClient();
  const newBlogpost = {
    title: formData.get("title"),
    content: formData.get("content"),
    thumbnail: formData.get("thumbnail"),
    tags: formData.get("tags"),
    category: formData.get("category"),
    isFeatured: formData.get("isFeatured"),
    isPublished: false,
  };
  const { error } = await supabase
    .from("blogposts")
    .insert(newBlogpost)
    .select("*");

  if (error) return { data: null, errorMessage: error.message };

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
