import React from "react";
import styles from "./page.module.css";
import Navigate from "@/components/Navigate";
import { Metadata } from "next";
import PostForm from "@/components/PostForm";
import { getBlogpostToUpdate } from "@/services/blogServices";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Edit Post",
};

export default async function EditPostPage({
  params,
}: {
  params: { blogId: string };
}) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  const blogpostId = params.blogId.split("_").at(-1);
  if (!blogpostId) notFound();

  const blogpost = await getBlogpostToUpdate(blogpostId);
  if (!blogpost) notFound();

  if (data.user?.id !== blogpost.author.id) notFound();

  return (
    <div className={styles["edit-post-page"]}>
      <h1>Edit Post</h1>
      <PostForm blogpost={blogpost} />
    </div>
  );
}
