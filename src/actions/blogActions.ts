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
    revalidatePath("/", "layout");
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
    revalidatePath("/", "layout");
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
    revalidatePath("/", "layout");
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
    revalidatePath("/", "layout");
    redirect("/dashboard");
  }

  return { errorMessage: error.message };
}

export async function deletePost(initialState: any, formData: FormData) {
  const supabase = createClient();

  const postId = formData.get("postId") as string;

  const { error } = await supabase.from("blogposts").delete().eq("_id", postId);

  if (!error) {
    revalidatePath("/", "layout");
  }

  return { done: true, error: error?.message || null };
}

export async function toggleLikePost(userId: string, blogId: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("blogposts")
    .select("likes, dislikes")
    .eq("_id", blogId);

  if (data && data[0]) {
    let newLikedPosts: string[] = [];
    let newDislikedPosts: string[] = [];
    const oldLikedPosts = data[0].likes;
    const oldDislikedPosts = data[0].dislikes;
    if (oldLikedPosts.includes(userId)) {
      newLikedPosts = oldLikedPosts.filter((user: string) => user !== userId);
    } else {
      newLikedPosts = [...oldLikedPosts, userId];
    }
    if (oldDislikedPosts.includes(userId)) {
      newDislikedPosts = oldDislikedPosts.filter(
        (user: string) => user !== userId
      );
    }
    const { error } = await supabase
      .from("blogposts")
      .update({ likes: newLikedPosts, dislikes: newDislikedPosts })
      .eq("_id", blogId);
  }

  revalidatePath("/blog/[blogTitle]", "page");
  revalidatePath("/dashboard");
}

export async function toggleDislikePost(userId: string, blogId: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("blogposts")
    .select("likes, dislikes")
    .eq("_id", blogId);

  if (data && data[0]) {
    let newLikedPosts: string[] = [];
    let newDislikedPosts: string[] = [];
    const oldLikedPosts = data[0].likes;
    const oldDislikedPosts = data[0].dislikes;
    if (oldDislikedPosts.includes(blogId)) {
      newDislikedPosts = oldDislikedPosts.filter(
        (user: string) => user !== userId
      );
    } else {
      newDislikedPosts = [...oldDislikedPosts, userId];
    }
    if (oldLikedPosts.includes(userId)) {
      newLikedPosts = oldLikedPosts.filter((user: string) => user !== userId);
    }
    const { error } = await supabase
      .from("blogposts")
      .update({ likes: newLikedPosts, dislikes: newDislikedPosts })
      .eq("_id", blogId);
  }

  revalidatePath("/blog/[blogTitle]", "page");
  revalidatePath("/dashboard");
}
