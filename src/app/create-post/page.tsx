import React from "react";
import styles from "./page.module.css";
import Navigate from "@/components/Navigate";
import { Metadata } from "next";
import PostForm from "@/components/PostForm";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Create New Post",
};

export default async function CreatePostPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!data || error) return <Navigate to="/login" />;

  return (
    <div className={styles["create-new-post-page"]}>
      <h1>Create Post</h1>
      <PostForm />
    </div>
  );
}
