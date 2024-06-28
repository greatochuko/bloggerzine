"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// add field "rootCommentId" to comment to delete all replies associated with a comment on delete of that comment

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
    revalidatePath("/blog/[blogTitle]", "page");
  }

  return { errorMessage: error ? "Something went wrong" : null };
}

export async function postReply(initialState: any, formData: FormData) {
  const supabase = createClient();

  const data = {
    parentId: formData.get("parentId") || null,
    rootCommentId: formData.get("rootCommentId"),
    blogpost: formData.get("blogpost") as string,
    comment: formData.get("reply") as string,
  };

  const { error } = await supabase.from("comments").insert(data);

  if (error) {
    console.log(error.message);
  }

  if (!error) {
    revalidatePath("/dashboard");
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
    revalidatePath("/blog/[blogTitle]", "page");
  }

  return { done: true, error: error ? "Something went wrong" : null };
}

export async function deleteComment(initialState: any, formData: FormData) {
  const supabase = createClient();

  const commentId = formData.get("commentId") as string;

  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  const { error: replyError } = await supabase
    .from("comments")
    .delete()
    .eq("rootCommentId", commentId);

  const { error: nestedReplyError } = await supabase
    .from("comments")
    .delete()
    .eq("parentId", commentId);

  if (!error && !replyError && !nestedReplyError) {
    revalidatePath("/dashboard");
    revalidatePath("/blog/[blogTitle]", "page");
  }

  return { done: true, error: error ? "Something went wrong" : null };
}
