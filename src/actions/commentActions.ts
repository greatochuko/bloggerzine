"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function postComment(initialState: any, formData: FormData) {
  const supabase = createClient();

  const data = {
    parentId: formData.get("parentId") || null,
    blogpost: formData.get("blogpost") as string,
    comment: formData.get("comment") as string,
  };

  const { error } = await supabase.from("comments").insert(data);

  if (!error) {
    revalidatePath("/dashboard");
    revalidatePath("/authors/[userSlug]", "page");
    revalidatePath("/blog/[blogTitle]", "page");
  }

  return { errorMessage: error ? "Something went wrong" : null };
}

export async function postReply(initialState: any, formData: FormData) {
  const supabase = createClient();

  const data = {
    parentId: formData.get("parentId") || null,
    blogpost: formData.get("blogpost") as string,
    comment: formData.get("reply") as string,
  };

  const { error } = await supabase.from("comments").insert(data);

  if (!error) {
    revalidatePath("/dashboard");
    revalidatePath("/authors/[userSlug]", "page");
    revalidatePath("/blog/[blogTitle]", "page");
  }

  return { done: true, errorMessage: error ? "Something went wrong" : null };
}

export async function editComment(initialState: any, formData: FormData) {
  const supabase = createClient();

  const comment = formData.get("comment") as string;
  const commentId = formData.get("commentId") as string;

  const { error } = await supabase
    .from("comments")
    .update({ comment })
    .eq("id", commentId);

  if (!error) {
    revalidatePath("/dashboard");
    revalidatePath("/authors/[userSlug]", "page");
    revalidatePath("/blog/[blogTitle]", "page");
  }

  return { done: true, errorMessage: error ? "Something went wrong" : null };
}
